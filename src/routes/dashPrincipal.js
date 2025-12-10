var express = require("express");
var router = express.Router();

var dashPrincipalController = require("../controllers/dashPrincipalController");

router.get("/carregarGraficoBarra", function(req, res) {
    dashPrincipalController.carregarGraficoBarra(req, res); // /dashPrincipal/carregarGraficoBarra
});

router.get("/carregarGraficoBidirecional", function(req, res) {
    dashPrincipalController.carregarGraficoBidirecional(req, res); // /dashPrincipal/carregarGraficoBidirecional
});

router.get("/buscarSomaPtrf", function(req, res) {
    dashPrincipalController.buscarSomaPtrf(req, res); ///dashPrincipal/buscarSomaPtrf
});

router.get("/buscarMediaFluxoZona", function(req, res) {
    dashPrincipalController.buscarMediaFluxoZona(req, res); ///dashPrincipal/buscarMediaFluxoZona
});



module.exports = router;