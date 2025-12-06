function listarEscolas() {
    fetch("/dashPorEscola/listarEscolas")
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw "Erro ao listar escolas";
            }
        }).then((dados) => {

            const dadosOrdenados = ordenarLista(dados);
            let exibicaoFinal = "";

            for (let i = 0; i < dadosOrdenados.length; i++) {
                let itemAtual = dadosOrdenados[i];

                exibicaoFinal += `
                    <tr onclick="abrirDashBoardUnica('${itemAtual.codigo_inep}')">
                            <td>${itemAtual.nome_escola}</td>
                            <td>${itemAtual.codigo_inep}</td>
                            <td>${itemAtual.nota_ideb}</td>
                            <td>${itemAtual.endereco}</td>
                            <td>${itemAtual.cep}</td>
                    </tr>
                        `
            }

            tbody_content.innerHTML = exibicaoFinal;

        }).catch((error) => {
            console.error(error);
        })
}

function carregarDadosDashboard(idEscola) {
    return fetch(`/dashPorEscola/carregarDadosDashboard/${idEscola}`)
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw "Erro ao buscar dados das escolas";
            }
        }).then((dados) => {

            let dadosGerais = {
                nomeEscola: dados[0].nome_escola,
                ideb: [],
                ptrf: [],
                anosIdeb: [],
                anosPtrf: [],
                anosGerais: []
            }

            for (let i = 0; i < dados.length; i++) {
                let itemAtual = dados[i];

                let anoIdeb = parseInt(itemAtual.ano_ideb);
                dadosGerais.anosIdeb.push(anoIdeb);

                let anoPtrf = parseInt(itemAtual.ano_ptrf);
                dadosGerais.anosPtrf.push(anoPtrf);

                let anoDefinido = "N/A";

                if (!isNaN(anoIdeb)) {
                    anoDefinido = anoIdeb;
                } else if (!isNaN(anoPtrf)) {
                    anoDefinido = anoPtrf;
                }

                dadosGerais.anosGerais.push(anoDefinido);
                dadosGerais.ideb.push(itemAtual.nota_ideb);
                dadosGerais.ptrf.push(tratarDadosGrafico(itemAtual.soma_ptrf));
            }

            return dadosGerais;

        }).catch((error) => {
            console.error(error);
        })
}

function carregarKpiRank(idEscola) {
    return fetch(`/dashPorEscola/carregarKpiRank`)
        .then((resposta) => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw "Erro ao buscar dados das escolas";
            }
        })
        .then((dados) => {
            montarKpiRanking(idEscola, dados);
        })
        .catch((error) => {
            console.error(error);
        })

}

// funcções sem requisição HTTP
function plotarKpi(dados) {

    // dados retorna um objeto com os mesmos dados utilizados no gráfico
    const nome = dados.nomeEscola;

    const anoAtual = pegarAno(dados.anosGerais);
    const spanAno = document.querySelectorAll('.kpi-ref-ano');
    for (let i = 0; i < spanAno.length; i++) {
        spanAno[i].textContent = "(" + anoAtual + ")"
    }

    //montar kpi do ideb
    const idebs = dados.ideb;
    const anosIdeb = dados.anosIdeb;
    montarKpiIdeb(idebs, anosIdeb, anoAtual);

    //monta kpi do repasse
    const ptrfs = dados.ptrf;
    const anosPtrf = dados.anosPtrf;
    montarKpiPtrf(ptrfs, anosPtrf, anoAtual);
}

function montarKpiIdeb(idebs, anosIdeb, anoAtual) {


    if (pegarAno(anosIdeb) < parseFloat(anoAtual)) {
        document.getElementById('ideb-atual').textContent = "Escola não possui últimas notas";
        document.getElementById('ideb-atual-variacao').textContent = "";
        return;
    }

    let idebPassado = 0;
    let idebAtual = 0;


    if (anosIdeb.length < 2) {
        idebAtual = idebs[0];
        document.getElementById('ideb-atual-variacao').textContent = "";
    } else {
        idebPassado = idebs[0];
        idebAtual = idebs[1];
        if (!idebs.includes('N/A')) {
            document.getElementById('ideb-atual-variacao').textContent = formatarVariacao(idebAtual, idebPassado, "ideb-atual-variacao");
        } else {
            document.getElementById('ideb-atual-variacao').textContent = '(N/A)'
        }
    }

    if (!isNaN(parseFloat(idebAtual))) {
        document.getElementById('ideb-atual').textContent = idebAtual + "/10";
    }
}

function montarKpiPtrf(ptrfs, anosPtrf, anoAtual) {

    console.log(ptrfs + " - " + anosPtrf + " - " + anoAtual)

    if (pegarAno(anosPtrf) < parseFloat(anoAtual)) {
        document.getElementById('ptrf-atual').textContent = "Escola não possui últimas verbas";
        document.getElementById('ptrf-atual-variacao').textContent = "";
        return;
    }

    let ptrfPassado = 0;
    let ptrfAtual = 0;

    if (anosPtrf.length < 2) {
        idebAtual = ptrfs[0];
    } else {
        ptrfPassado = ptrfs[0];
        ptrfAtual = ptrfs[1];

        const variacao = ptrfAtual - ptrfPassado;

        let mensagemVariacao = "(" + formatarDinheiro(variacao);


        if (variacao > 0) {
            document.getElementById("ptrf-atual-variacao").style.color = "green";
            mensagemVariacao += "🔼)";
        } else if (variacao < 0) {
            document.getElementById("ptrf-atual-variacao").style.color = "red";
            mensagemVariacao += "🔽)"
        }
        document.getElementById('ptrf-atual-variacao').textContent = mensagemVariacao
    }

    if (!isNaN(parseFloat(ptrfAtual))) {
        document.getElementById('ptrf-atual').textContent = formatarDinheiro(ptrfAtual);
    }

}

function montarKpiRanking(idEscola, dados) {

    const rankIdeb = {
        anos_ideb: [],
        rankings: [],
        maiorAno: dados[0].maior_ano
    };

    if (rankIdeb.maiorAno == undefined || rankIdeb.maiorAno == null) {
        document.getElementById('ranking-atual').textContent = 'Não possui nota atual para poder rankear';
        document.getElementById('variacao-ranking').textContent = '';
        return;
    }

    for (let index = 0; index < dados.length; index++) {
        const itemAtual = dados[index];
        if (itemAtual.codigo_inep == idEscola) {
            rankIdeb.anos_ideb.push(itemAtual.ano_ideb);
            rankIdeb.rankings.push(itemAtual.ranking);
        }
    }

    let maiorAno = rankIdeb.maiorAno.toString();

    if (rankIdeb.anos_ideb.length == 0 || !rankIdeb.anos_ideb.includes(maiorAno)) {
        document.getElementById('ranking-atual').textContent = 'Não possui nota atual para poder rankear';
        document.getElementById('variacao-ranking').textContent = '';
        return;
    }

    const  rankPassado = rankIdeb.rankings[0];
    const  rankAtual = rankIdeb.rankings[1];

    //Caso tudo esteja certo
    document.getElementById('ranking-atual').textContent = rankAtual;

    if (rankIdeb.anos_ideb.length == 1 && rankIdeb.anos_ideb.includes(maiorAno)) {
        document.getElementById('variacao-ranking').textContent = '';
        return;
    }

    

    document.getElementById('variacao-ranking').textContent = formatarVariacao(rankPassado, rankAtual, "variacao-ranking");

}

function ordenarLista(lista) {
    const comNota = lista.filter(item => !isNaN(parseFloat(item.nota_ideb)));
    const semNota = lista.filter(item => isNaN(parseFloat(item.nota_ideb)));

    comNota.push(...semNota);

    return comNota;
}

function abrirDashBoardUnica(codigo_inep) {
    sessionStorage.ID_ESCOLA = codigo_inep;

    window.location.href = 'dashPorEscola.html'
}

function formatarVariacao(primeiroIndice, segundoIndice, idHtml) {
    const variacao = primeiroIndice - segundoIndice;

    if (variacao > 0) {
        document.getElementById(idHtml).style.color = "green";
        return "(+" + variacao.toFixed(2) + "🔼)";
    } else if (variacao < 0) {
        document.getElementById(idHtml).style.color = "red";
        return "(" + variacao.toFixed(2) + "🔽)";
    } else {
        return "(" + variacao + ")";
    }

}

function tratarDadosGrafico(valor) {

    console.log("Valor: " + valor)

    if (valor == 'N/A') return;

    if (!valor) return null;

    if (typeof valor === 'string') {
        valor = valor.replace(',', '.');
    }

    const numero = parseFloat(valor);

    return isNaN(numero) ? null : numero;
}

function pegarAno(array) {

    let maiorAno = !isNaN(parseFloat(array[0])) ? parseFloat(array[0]) : 0;

    for (let i = 0; i < array.length; i++) {
        arrayAtual = parseFloat(array[i]);

        if (isNaN(arrayAtual)) {
            continue;
        }

        if (arrayAtual > maiorAno) {
            maiorAno = arrayAtual;
        }

    }
    return maiorAno;

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


