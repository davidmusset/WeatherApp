var mongoose = require('mongoose');

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
