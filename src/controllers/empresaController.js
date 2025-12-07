var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {

    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;

    if (razaoSocial == undefined) {
        res.status(400).send("Razão social está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("CNPJ está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Email está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Telefone está undefined!");
    } else {
        empresaModel.cadastrarEmpresa(razaoSocial, cnpj, email, telefone)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function gerarToken(req, res) {
    var tokenEmpresa = req.body.tokenServer;
    var idEmpresa = req.body.idEmpresaServer;  

    if (tokenEmpresa == undefined) {
        return res.status(400).send("Token está undefined!");
    } else if (idEmpresa == undefined) {
        return res.status(400).send("id da empresa está undefined");
    } else {
        empresaModel.gerarToken(idEmpresa, tokenEmpresa)
            .then(resultado => res.json(resultado))
            .catch(erro => {
                console.log("\nHouve um erro ao inserir token! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function carregarEmpresas(req, res) {

    empresaModel.carregarEmpresas()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve erro ao buscar as empresas! ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function salvarAtualizarEmpresa(req, res) {
    var id = req.params.id;
    var razaoSocial = req.body.razaoSocialServer;
    var cnpj = req.body.cnpjServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;

    if (id == undefined) {
        console.log("id está indefinido!");
    } else if (razaoSocial == undefined) {
        console.log("Razão Social está indefinido!");
    } else if (cnpj == undefined) {
        console.log("CNPJ está indefinido!")
    } else if (email == undefined) {
        console.log("E-Mail está indefinido!")
    } else if (telefone == undefined) {
        console.log("Telefone está indefinido!")
    } else {
        empresaModel.salvarAtualizarEmpresa(id, razaoSocial, cnpj, email, telefone)
            .then(
                function () {
                    res.json("Empresa atualizada.");
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function deletarEmpresa(req, res) {
    var id = req.params.id;

    if (id == undefined) {
        console.log("id está indefinido!");
    } else {
        empresaModel.deletarEmpresa(id)
            .then(
                function () {
                    res.json("Empresa deletada.");
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

module.exports = {
    gerarToken,
    cadastrarEmpresa,
    carregarEmpresas,
    salvarAtualizarEmpresa,
    deletarEmpresa
}