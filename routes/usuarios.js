var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

var Entrenamiento = require('../models/Entrenamiento.js');
var VueltaEnLaPlaza = require('../models/VueltaEnLaPlaza.js');

var Foto = require('../models/Foto.js');
var fs = require('fs');
var os = require("os");

var dir = "subidas/";

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
    Usuario.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:username', function(req, res, next) {
  var query = {'username':req.params.username};
  Usuario.findOne(query, function(err, post){
      if (err) return next(err);
      res.json(post);
  });    
});

/********************************************************/
router.get('/:username/foto', function(req, res, next) {
  var query = {'username':req.params.username};
  Usuario.findOne(query, function(err, user){
    if (err) return next(err);
    console.log("user", user);
    if(user.foto!=null){
      Foto.findById({_id: user.foto}, function (err, foto) {
        if (err) return next(err);
        res.json(foto);
      });
    }else{
      res.json(null);
    }    
  });    
});


router.post('/:username/foto',  function(req, res, next) {
  if (!req.files)
  return res.status(400).send('No files were uploaded.' + req.files + "_");

  var hostname = os.hostname();
  //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var fullUrl = req.protocol + '://' + req.get('host') + "/";//+ req.originalUrl;

  //console.log("hostname", fullUrl);

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let foto = req.files.foto;
  var contentType = foto.mimetype;
  if(!fs.existsSync(dir))
    fs.mkdirSync(dir);
  var path = dir + req.files.foto.name;
  foto.mv(path, function(err) {
    if (err)
      return res.status(500).send(err);
    
    var contentFile = fs.readFileSync(path);    
    var imageAsBase64 = fs.readFileSync(path, 'base64');
    var mimetypeAndImageAsBase64 ="data:"+foto.mimetype + ";" + imageAsBase64;
    var f = {
      nombre: req.body.nombre,
      url: fullUrl+ path, 
      base64: mimetypeAndImageAsBase64
    };
    //console.log("f", f);
    Foto.create(f, function (err, foto) {
      if (err) return next(err);
        
      //actualizo la foto del user
      var quser = {'username':req.params.username};
      Usuario.findOne(quser, function(err, user){
        if (err) return next(err);
        user.foto = foto._id;
        Usuario.findOneAndUpdate({_id: user._id}, user, function (err, user) {
          if (err) return next(err);
          res.json(user);
        });
      });   
      });
  });


});

/********************************************************/
router.post('/:username/entrenamientos/vueltaenlaplaza', function(req, res, next) {
  var quser = {'username':req.params.username};
  Usuario.findOne(quser, function(err, user){
      if (err) return next(err);
      var qentre = {tipo: "vueltaplaza", usuario: user._id};

      Entrenamiento.create(qentre, function (err, entre) {
        if (err) return next(err);
        //res.json(entre);
        //var track = [{lat: 12, lng: 34}, {lat: 56, lng: 78}, {lat: 88, lng: 99}];
        var tracking = req.body.tracking;
        var qvuelta = {
          tracking: tracking, 
          entrenamiento: entre._id};
        VueltaEnLaPlaza.create(qvuelta, function (err, vuelta) {
          if (err) return next(err);
          //console.log("vuelta", vuelta);
          res.json(vuelta);          
        });
      });
  });    
});


/********************************************************/
router.get('/:username/entrenamientos', function(req, res, next) {
  var quser = {'username':req.params.username};
  Usuario.findOne(quser, function(err, user){
      if (err) return next(err);
      var qentre = {usuario: user._id}

      Entrenamiento.find(qentre, function (err, entres) {
        if (err) return next(err);
        res.json(entres);
      });
  });    
});

router.post('/:username/entrenamientos', function(req, res, next) {
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
/********************************************************/
/* SAVE PRODUCT */
router.post('/', function(req, res, next) {
    Usuario.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PRODUCT */
router.put('/:username', function(req, res, next) {
    
    var query = {'username':req.params.username};
    Usuario.findOneAndUpdate(query, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/:username', function(req, res, next) {
    var query = {'username':req.params.username};
    Usuario.findOneAndRemove(query, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
