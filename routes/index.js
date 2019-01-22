var express = require('express');
var router = express.Router();
var request = require('request');

var cityList = [];

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { cityList: cityList,  erreur: "False" });
});

router.post('/add-city', function(req, res, next) {

  var newCity = capitalizeFirstLetter(req.body.newCity);
  var weatherMain = [];
  var weatherIcon = [];
  var Tmatin ="";
  var Tsoir = "";
  request("http://api.openweathermap.org/data/2.5/weather?q="+newCity+"&appid=c1a7f6aeef5997d4d041568764497ffe", function(error, response, body) {
  var cityDetail = JSON.parse(body);
  if(cityDetail.cod == "404"){
    res.render('index', { cityList: cityList, erreur: "True" });
  }
  else{
          for(i=0; i<cityDetail.weather.length; i++){
          weatherMain.push(cityDetail.weather[i].main);
          weatherIcon.push(cityDetail.weather[i].icon);
        }

        Tmatin = parseInt(cityDetail.main.temp_min)-273,15;
        Tsoir = parseInt(cityDetail.main.temp_max)-273,15;
        Latt = cityDetail.coord.lat;
        Lon = cityDetail.coord.lon;
        cityList.push({nom: newCity, temps:weatherMain, img: weatherIcon, Tmatin:Tmatin, Tsoir:Tsoir, Latt:Latt, Lon:Lon})

        res.render('index', { cityList: cityList , erreur: "False"});
        }
    });

});

router.post('/delete-city', function(req, res, next) {

  var deleteCity = req.body.deleteCity;
  cityList.splice(deleteCity,1)
  res.render('index', { cityList: cityList,  erreur: "False" });
});

module.exports = router;
