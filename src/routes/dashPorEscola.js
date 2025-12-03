var express = require("express");
var router = express.Router();

var dashPorEscolaController = require("../controllers/dashPorEscolaController");

router.get("/listarEscolas", function(req, res) {
    dashPorEscolaController.listarEscolas(req, res); // /dashPorEscola/listarEscolas
});

module.exports = router;