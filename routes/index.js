var express = require('express');
var router = express.Router();

var dataVille = [
  {nom: "Paris", temps:"couvert", Tmatin:9, Tsoir:9},
  {nom: "Marseille", temps:"couvert", Tmatin:4, Tsoir:9},
  {nom: "Toulouse", temps:"ensoleillé", Tmatin:6, Tsoir:12},
  {nom: "Bordeaux", temps:"bruine légère", Tmatin:0, Tsoir:5},
  {nom: "Lille", temps:"neige", Tmatin:-2, Tsoir:1}
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { dataVille: dataVille });
});

module.exports = router;
