var express = require('express');
var router = express.Router();

var cityList = [
  {nom: "Paris", temps:"couvert", img:"couvert.png", Tmatin:9, Tsoir:9},
  {nom: "Marseille", temps:"couvert", img:"couvert.png", Tmatin:4, Tsoir:9},
  {nom: "Toulouse", temps:"ensoleillé", img:"ensoleillé.png", Tmatin:6, Tsoir:12},
  {nom: "Bordeaux", temps:"bruine légère", img:"bruine légère.png", Tmatin:0, Tsoir:5},
  {nom: "Lille", temps:"neige", img:"neige.png", Tmatin:-2, Tsoir:1}
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { cityList: cityList });
});

router.post('/add-city', function(req, res, next) {

  var newCity = req.body.newCity
  cityList.push({nom: newCity, temps:"couvert", img: "couvert.png", Tmatin:3, Tsoir:5})
  res.render('index', { cityList: cityList });
});

router.post('/delete-city', function(req, res, next) {

  var deleteCity = req.body.deleteCity;
  cityList.splice(deleteCity,1)
  res.render('index', { cityList: cityList });
});

module.exports = router;
