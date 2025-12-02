var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/cadastrarEmpresa", function(req, res) {
    empresaController.cadastrarEmpresa(req, res);
});

router.post("/gerarToken", function(req, res) {
    empresaController.gerarToken(req, res);
});

router.get("/carregarEmpresas", function(req, res) {
    empresaController.carregarEmpresas(req, res);
});

router.put("/salvarAtualizarEmpresa/:id", function(req, res) {
    empresaController.salvarAtualizarEmpresa(req, res);
});

router.delete("/deletarEmpresa/:id", function(req, res) {
    empresaController.deletarEmpresa(req, res);
});

module.exports = router;