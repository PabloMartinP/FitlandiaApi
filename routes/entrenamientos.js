var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Entrenamiento = require('../models/Entrenamiento.js');
var Usuario = require('../models/Usuario.js');
/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
    Entrenamiento.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.post('/:username', function(req, res, next) {
    var query = {'username':req.params.username};
    //var query = {username: "fit"};    
    Usuario.findOne(query, function(err, user){  
      //5b130766245329001464917d es la imagen de camus /subidas/camus_de_acuario--i_14138541274414138513 (1).png
      if (err) return next(err);
      if(user!=null){
        var nuevoEntrenamiento = {
          tipo: req.body.tipo,
          comentario: req.body.comentario,   
          usuario:user._id
        }
        Entrenamiento.create(nuevoEntrenamiento, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      }
    });
});

/* SAVE PRODUCT */
router.post('/', function(req, res, next) {
  Entrenamiento.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
