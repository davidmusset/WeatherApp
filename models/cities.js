var mongoose = require('mongoose');

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

module.exports = UserModel
