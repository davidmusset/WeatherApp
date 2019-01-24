var express = require('express');
var router = express.Router();
var request = require('request');
var session = require("express-session");
var mongoose = require('../models/bddconnect');
var UserModel = require('../models/cities');
var Users = require('../models/users');

//fonction qui majuscule la première lettre
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



// ------ROUTES------


/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.userId == undefined){
        req.session.userId = req.query.id;
      }

  Users.findById(req.session.userId,function (err, currentlog) {

    if(currentlog == undefined){
        res.redirect('/users/signin');
      }
    else{
        nom = currentlog.Nom;
        req.session.cityList = [];

        UserModel.find(
          function (err, users) {
            for(i=0; i<users.length;i++){
                var tempsbdd = [];
                var imgbdd =[];
                tempsbdd.push(users[i].Temps1);
                imgbdd.push(users[i].Icon1);
                if (!(users[i].Temps2 == undefined)){tempsbdd.push(users[i].Temps2); imgbdd.push(users[i].Icon2);}
                if (!(users[i].Temps3 == undefined)){tempsbdd.push(users[i].Temps3); imgbdd.push(users[i].Icon3);}


              req.session.cityList.unshift({
                id: users[i].id,
                nom: users[i].Nom,
                temps: tempsbdd,
                img: imgbdd,
                Tmatin:users[i].Tmatin,
                Tsoir:users[i].Tsoir,
                Latt:users[i].Latt,
                Lon:users[i].Lon
              })
            }
            res.render('index', { cityList: req.session.cityList,  erreur: "False", currentnom: nom });
          }
        )
      }
      }
  )

});


// Ajouter une Ville

router.post('/add-city', function(req, res, next) {

  var newCity = capitalizeFirstLetter(req.body.newCity);
  var newLon = capitalizeFirstLetter(req.body.longitude);
  var newLatt = capitalizeFirstLetter(req.body.lattitude);
  var weatherMain = [];
  var weatherIcon = [];
  var Tmatin ="";
  var Tsoir = "";

  //Récupération de l'API
  request("http://api.openweathermap.org/data/2.5/weather?lat="+newLatt+"&lon="+newLon+"&appid=c1a7f6aeef5997d4d041568764497ffe", function(error, response, body) {
  var cityDetail = JSON.parse(body);

  if(cityDetail.cod == "404"){
    res.render('index', { cityList: req.session.cityList, erreur: "True" });
  }
  else{
          for(i=0; i<2; i++){
          if(!(cityDetail.weather[i] == undefined)){
            weatherMain.push(cityDetail.weather[i].main);
            weatherIcon.push(cityDetail.weather[i].icon);
          }

        }

        Tmatin = parseInt(cityDetail.main.temp_min)-273,15;
        Tsoir = parseInt(cityDetail.main.temp_max)-273,15;
        Latt = cityDetail.coord.lat;
        Lon = cityDetail.coord.lon;

        // Insertion d'une nouvelle ville
        var newUser = new UserModel ({
         Nom: newCity,
         Temps1: weatherMain[0],
         Temps2: weatherMain[1],
         Temps3: weatherMain[2],
         Icon1: weatherIcon[0],
         Icon2: weatherIcon[1],
         Icon3: weatherIcon[2],
         Tmatin: Tmatin,
         Tsoir: Tsoir,
         Latt: Latt,
         Lon: Lon
        });

      // Sauvegarde
        newUser.save(
            function (error, user) {
             }
        );

        req.session.cityList.unshift({nom: newCity, temps:weatherMain, img: weatherIcon, Tmatin:Tmatin, Tsoir:Tsoir, Latt:Latt, Lon:Lon})

        res.render('index', { cityList: req.session.cityList , erreur: "False"});
        }
    });

});



//Supprimer une vile

router.post('/delete-city', function(req, res, next) {

  //Suppression dans le front
  var deleteCity = req.body.deleteCity;
  req.session.cityList.splice(deleteCity,1)

  var idDelete

  //Suppression dans Mangoose
  idList = [];

  UserModel.find(
    function (err, users) {
      for(i=0; i<users.length;i++){
        idList.unshift(users[i].id);
        idDelete = idList[deleteCity]
      }

      UserModel.deleteOne(
        { _id: idDelete},
        function(error) {
        }
      );

    }
  )


  //Res Render
  res.render('index', { cityList: req.session.cityList,  erreur: "False" });
});








module.exports = router;
