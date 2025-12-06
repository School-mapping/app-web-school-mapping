var express = require("express");
var router = express.Router();

var dashPorEscolaController = require("../controllers/dashPorEscolaController");

router.get("/listarEscolas", function(req, res) {
    dashPorEscolaController.listarEscolas(req, res); // /dashPorEscola/listarEscolas
});

router.get("/carregarDadosDashboard/:id", function(req, res) {
    dashPorEscolaController.carregarDadosDashboard(req, res); // /dashPorEscola/carregarDadosDashboard/35271238
});

router.get("/carregarKpiRank", function(req, res) {
    dashPorEscolaController.carregarKpiRank(req, res); // /dashPorEscola/carregarKpiRank
});

module.exports = router;