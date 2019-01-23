var express = require('express');
var router = express.Router();
var request = require('request');
var session = require("express-session");
var mongoose = require('mongoose');

//fonction qui majuscule la première lettre
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// Initialisation de mongoose
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}

//connection à la base de données mongoose
mongoose.connect('mongodb://davidmusset:Salut9367@ds163984.mlab.com:63984/weatherapp',
    options,
    function(err) {
     console.log(err);
    }
);

//Création du schéma de la bdd
var userSchema = mongoose.Schema({
    Nom: String,
    Temps1: String,
    Temps2: String,
    Temps3: String,
    Icon1: String,
    Icon2: String,
    Icon3: String,
    Tmatin: Number,
    Tsoir: Number,
    Latt: Number,
    Lon: Number
});

//Création du type d'objet qui permet d'insérer
var UserModel = mongoose.model('CityList', userSchema);



// ------ROUTES------

/* GET home page. */
router.get('/', function(req, res, next) {
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
      res.render('index', { cityList: req.session.cityList,  erreur: "False" });
    }
  )

});


// Ajouter une Ville

router.post('/add-city', function(req, res, next) {

  var newCity = capitalizeFirstLetter(req.body.newCity);
  var weatherMain = [];
  var weatherIcon = [];
  var Tmatin ="";
  var Tsoir = "";

  //Récupération de l'API
  request("http://api.openweathermap.org/data/2.5/weather?q="+newCity+"&appid=c1a7f6aeef5997d4d041568764497ffe", function(error, response, body) {
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

router.post('/delete-city', function(req, res, next) {

  //Suppression dans Mangoose
  var idDelete = req.body.idDelete

  UserModel.deleteOne(
    { _id: idDelete},
    function(error) {
    }
  );

  //Suppression dans le front
  var deleteCity = req.body.deleteCity;
  req.session.cityList.splice(deleteCity,1)

  //Res Render
  res.render('index', { cityList: req.session.cityList,  erreur: "False" });
});

module.exports = router;
