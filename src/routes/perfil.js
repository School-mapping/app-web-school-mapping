var express = require("express");
var router = express.Router();

var perfilController = require("../controllers/perfilController");

router.get("/carregarPerfil/:id", function(req, res) {
    perfilController.carregarPerfil(req, res);
});

module.exports = router;