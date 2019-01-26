var express = require('express');
var router = express.Router();
var UserModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/users/signin');
});


// Get SIGNIN page

router.get('/signin',
  function(req, res, next) {
    res.render('signinform', {erreurmess: ""} );
  }
);


//Form Signin

router.post('/signin',
  function(req, res, next) {

    mail = req.body.mail;
    password = req.body.password;

    UserModel.findOne(
      {Mail: mail, Password: password},
        function (err, users) {
          if(users == undefined){
            res.render('signinform',  {erreurmess:"Mail ou mot de passe incorrect"});
          }
          else{
            req.session.userId = users.id;
            res.redirect('/');
          }
        }
    )
  }
);


// Get Signup page

router.get('/signup',
  function(req, res, next) {
    res.render('signupform', {erreurmess : ""});
  }
);

// Form Signup

router.post('/signup',
  function(req, res, next) {
    var newId = "";
    var Name = req.body.user;
    var Mail = req.body.mail;
    var Password = req.body.password;
    var Image = req.body.image;

// on check si le mail n'existe pas déjà
    UserModel.findOne(
      {Mail: Mail},
        function (err, users) {
          if(users == undefined){

            // Insertion d'un nouvel utilisateur
            var newUser = new UserModel ({
             Nom: Name,
             Mail: Mail,
             Password: Password,
             Photo: Image
            });

          // Sauvegarde
            newUser.save(
                function (error, user) {
                  newId = user.id;
                  req.session.userId = user.id;
                  res.redirect('/');
                 }
            );

          }
          else{
            res.render('signupform', {erreurmess : "L'adresse e-mail est déjà utilisé"});;
          }
        }
    )







  }
);

// Get logout page

router.get('/logout',
  function(req, res, next) {
    req.session.userId = "";
    res.redirect('/users/signin')
  }
);



module.exports = router;
