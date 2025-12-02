function carregarGraficoBarra() {

    return fetch("/dashPrincipal/carregarGraficoBarra")
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Erro na requisição: " + resposta.status);
            }
        })
        .then(function (dadosCadastro) {
            const respostas = [
                [], //medias Ultimo ano. 
                [], // medias Penultimo Ano
                [] // Zona
            ];

            const anos = [];

            if (dadosCadastro.length > 0) {
                anos.push(dadosCadastro[0].ano_nota);
            } else {
                return respostas;
            }

            for (let i = 0; i < dadosCadastro.length; i++) {
                const anoAtual = dadosCadastro[i].ano_nota;

                if (anoAtual != anos[0]) {
                    if (anos.length < 2) {
                        anos.push(anoAtual);
                    }
                }

                if (anos.length === 2) {
                    break;
                }
            }

            for (let i = 0; i < dadosCadastro.length; i++) {

                const anoAtual = dadosCadastro[i].ano_nota;
                const media = parseFloat(dadosCadastro[i].media_nota);
                const regiao = dadosCadastro[i].regiao;

                if (anoAtual == anos[0]) {
                    respostas[0].push(media);
                    respostas[2].push(regiao);
                } else if (anoAtual == anos[1]) {
                    respostas[1].push(media);
                }
            }

            const respostasOrdenadas = ordernarMatriz(respostas);

            return {
                dadosBarra: respostasOrdenadas,
                anos: anos
            }

        })
        .catch(function (erro) {
            console.error(`#ERRO ao carregar dados do gráfico: `, erro);
            return [[], []];
        });
}

function carregarGraficoBidirecional() {

    return fetch("/dashPrincipal/carregarGraficoBidirecional")
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Erro na requisição: " + resposta.status);
            }
        })
        .then(function (dadosCadastro) {
            const respostas = [
                [], // Media Ideb 
                [], // Media Ptrf - Em Kilo
                [] // Regiao
            ];

            const ano = dadosCadastro[0].ano;

            if (dadosCadastro.length < 1) return respostas;

            for (let i = 0; i < dadosCadastro.length; i++) {

                const mediaIdeb = parseFloat(dadosCadastro[i].media_nota);
                const mediaPtrf = parseFloat(dadosCadastro[i].media_ptrf);
                const regiao = dadosCadastro[i].regiao;

                respostas[0].push(mediaIdeb);
                respostas[1].push(mediaPtrf / 1000);
                respostas[2].push(regiao);
            }

            const respostasOrdenadas = ordernarMatriz(respostas);

            return {
                dadosBidirecional: respostasOrdenadas,
                ano: ano
            };

        })
        .catch(function (erro) {
            console.error(`#ERRO ao carregar dados do gráfico: `, erro);
            return [[], []];
        });
}

function carregarDadosIdeb() {
    carregarGraficoBarra()
        .then(resultado => {
            const dadosBarra = resultado.dadosBarra;
            const anos = resultado.anos;


            const dataAtual = new Date();
            const anoAtual = anos[0]; // Ano fixo para coincidir com o gráfico
            const anoAnterior = anos[1]; // Ano fixo para coincidir com o gráfico

            document.getElementById('ano-atual').textContent = "(" + anoAtual + ")";
            document.getElementById('ano-anterior').textContent = "(" + anoAnterior + ")";

            // Usando os mesmos dados do gráfico de barras
            const dadosIdebAtual = dadosBarra[0];
            const dadosIdebAnterior = dadosBarra[1];
            const mediaAtual = calcularMedia(dadosIdebAtual);
            const mediaAnterior = calcularMedia(dadosIdebAnterior);
            const variacao = calcularVariacao(mediaAtual, mediaAnterior);

            document.getElementById('ideb-atual').textContent = formatarNumero(mediaAtual);
            document.getElementById('ideb-anterior').textContent = formatarNumero(mediaAnterior);
            formatarVariacao(variacao);
        })
}

function buscarSomaPTRf() {

    return fetch("/dashPrincipal/buscarSomaPtrf")
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Erro na requisição: " + resposta.status);
            }
        })
        .then(function (dadosCadastro) {

            if (dadosCadastro.length < 1) return respostas;

            const respostas = [
                dadosCadastro[0].soma_ultimo_ano,
                dadosCadastro[0].soma_penultimo_ano,
                dadosCadastro[0].diferenca_ptrf
            ];

            const ultimoAno = dadosCadastro[0].ultimo_ano;
            const penultimoAno = dadosCadastro[0].penultimo_ano;

            return {
                respostas: respostas,
                ultimoAno: ultimoAno,
                penultimoAno: penultimoAno
            };

        })
        .catch(function (erro) {
            console.error(`#ERRO ao carregar dados do gráfico: `, erro);
            return [[], []];
        });
}


// Funções sem requisições

function carregarDadosIdeb() {
    carregarGraficoBarra()
        .then(resultado => {
            const dadosBarra = resultado.dadosBarra;
            const anos = resultado.anos;


            const dataAtual = new Date();
            const anoAtual = anos[0]; // Ano fixo para coincidir com o gráfico
            const anoAnterior = anos[1]; // Ano fixo para coincidir com o gráfico

            document.getElementById('ano-atual').textContent = "(" + anoAtual + ")";
            document.getElementById('ano-anterior').textContent = "(" + anoAnterior + ")";

            // Usando os mesmos dados do gráfico de barras
            const dadosIdebAtual = dadosBarra[0];
            const dadosIdebAnterior = dadosBarra[1];
            const mediaAtual = calcularMedia(dadosIdebAtual);
            const mediaAnterior = calcularMedia(dadosIdebAnterior);
            const variacao = calcularVariacao(mediaAtual, mediaAnterior);

            document.getElementById('ideb-atual').textContent = formatarNumero(mediaAtual);
            document.getElementById('ideb-anterior').textContent = formatarNumero(mediaAnterior);
            formatarVariacao(variacao);
        })

}

function carregarDadosPtrf() {
    buscarSomaPTRf()
        .then(resultado => {
            const respostas = resultado.respostas;

            const ultimoAno = resultado.ultimoAno;
            const penultimoAno = resultado.penultimoAno;
            document.getElementById('ano-atual-ptrf').textContent = "(" + ultimoAno + ")";
            document.getElementById('ano-anterior-ptrf').textContent = "(" + penultimoAno + ")";

            const somaUltimoAno = respostas[0];
            const somaPenultimoAno = respostas[1];
            document.getElementById('atual-soma-ptrf').textContent = formatarDinheiro(somaUltimoAno);
            document.getElementById('anterior-soma-ptrf').textContent = formatarDinheiro(somaPenultimoAno);

            const diferenca = parseFloat(respostas[2]);
            if(diferenca > 0 ) {
                document.getElementById('variacao-ptrf').textContent = formatarDinheiro(diferenca);
                document.getElementById('variacao-ptrf').style = "color: green;"
            } else if (diferenca < 0 ){
                document.getElementById('variacao-ptrf').textContent = formatarDinheiro(diferenca);
                document.getElementById('variacao-ptrf').style = "color: red;"
            } else {
                document.getElementById('variacao-ptrf').textContent = "R$ 00,00";
            }

        })

}

function formatarNumero(numero) {
    return numero.toFixed(1).replace('.', ',') + " / 10,0";
}

function formatarDinheiro(valor) {

    const numero = parseFloat(valor);

    if (isNaN(numero)) {
        return "R$ 0,00";
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numero);
}

function calcularVariacao(atual, anterior) {
    if (anterior === 0) return 0;
    return ((atual - anterior) / anterior) * 100;
}

function formatarVariacao(variacao) {
    const elemento = document.getElementById('variacao-ideb');
    const valorFormatado = Math.abs(variacao).toFixed(1).replace('.', ',');

    if (variacao > 0) {
        elemento.innerHTML = `+${valorFormatado}%`;
        elemento.className = 'kpi-value positive';
    } else if (variacao < 0) {
        elemento.innerHTML = `-${valorFormatado}%`;
        elemento.className = 'kpi-value negative';
    } else {
        elemento.innerHTML = `${valorFormatado}%`;
        elemento.className = 'kpi-value neutral';
    }
}

function calcularMedia(array) {
    if (array.length === 0) return 0;
    const soma = array.reduce((a, b) => a + b, 0);
    return soma / array.length;
}


function ordernarMatriz(matriz) {

    const matrizOrdenada = matriz;
    const numeroColunas = matrizOrdenada[0].length;

    for (let i = 0; i < numeroColunas - 1; i++) {

        for (let j = 0; j < numeroColunas - 1 - i; j++) {

            let itemAtual = matrizOrdenada[0][j];
            let proximoItem = matrizOrdenada[0][j + 1];

            if (proximoItem > itemAtual) {
                //Ordena todos ositems da matriz
                for (let k = 0; k < matrizOrdenada.length; k++) {
                    copiaItemAtual = matrizOrdenada[k][j];
                    matrizOrdenada[k][j] = matrizOrdenada[k][j + 1];
                    matrizOrdenada[k][j + 1] = copiaItemAtual;
                }
            }
        }

    }

    return matrizOrdenada;
}