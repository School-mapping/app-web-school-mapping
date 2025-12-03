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

                for(let i = 0; i < dadosOrdenados.length; i++) {
                    let itemAtual = dadosOrdenados[i];

                    exibicaoFinal += `
                    <tr onclick="window.location.href='dashPorEscola.html'">
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

            })
    }

    function ordenarLista(lista) {
        const comNota = lista.filter(item => !isNaN(parseFloat(item.nota_ideb)));
        const semNota = lista.filter(item => isNaN(parseFloat(item.nota_ideb)));

        comNota.push(...semNota);
        
        return comNota;
    }