var mongoose = require('mongoose');

//Création du schéma de la bdd
var userSchema = mongoose.Schema({
    Nom: String,
    Mail: String,
    Password: String,
    Photo: String
});

//Création du type d'objet qui permet d'insérer
var UserModel = mongoose.model('users', userSchema);

module.exports = UserModel
