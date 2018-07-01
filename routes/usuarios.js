var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

var Entrenamiento = require('../models/Entrenamiento.js');
var VueltaEnLaPlaza = require('../models/VueltaEnLaPlaza.js');
var Logro = require('../models/Logro.js');
var Rutina = require('../models/Rutina.js');
var Peso = require('../models/LogPeso.js');

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
      /*var qentre = {
        tipo: "vueltaplaza", 
        distanciaEnMetros: req.body.distanciaEnMetros,
        tiempoEnSegundos: req.body.tiempoEnSegundos,
        usuario: user._id};*/
      var qentre = {
        tipo: "vueltaplaza", 
        usuario: user._id};
      
      Entrenamiento.create(qentre, function (err, entre) {
        if (err) return next(err);
        
        var qvuelta = req.body;
        qvuelta.entrenamiento = entre._id
        qvuelta.usuario = user._id;
        VueltaEnLaPlaza.create(qvuelta, function (err, vuelta) {
          if (err) return next(err);
          //console.log("vuelta", vuelta);
          res.json(vuelta);          
        });
      });
  });    
});


/********************************************************/
router.get('/:username/entrenamientos/vueltaenlaplaza', function(req, res, next) {
  var quser = {'username':req.params.username};
  Usuario.findOne(quser, function(err, user){
      if (err) return next(err);
      var qentre;
      //console.log("req.params.tipo", req.params.tipo);
      //console.log("req.params.tipo == undefined", req.params.tipo == undefined);      
      qentre = {usuario: user._id};
      
      VueltaEnLaPlaza.find(qentre).sort({fecha: -1}).exec(function (err, entres) {
        if (err) return next(err);
        res.json(entres);
      });
  });    
});

//////////////////////////////////////////////////////


router.get('/:username/peso', function(req, res, next) {
  var quser = {'username':req.params.username};
  Usuario.findOne(quser, function(err, user){
      if (err) return next(err);
      var qpeso;
      //console.log("req.params.tipo", req.params.tipo);
      //console.log("req.params.tipo == undefined", req.params.tipo == undefined);      
      qpeso = {usuario: user._id};
      
      Peso.find(qpeso).sort({fecha: 1}).exec(function (err, entres) {
        if (err) return next(err);
        res.json(entres);
      });
  });
});

router.post('/:username/peso', function(req, res, next) {
  var quser = {'username':req.params.username};
  Usuario.findOne(quser, function(err, user){
      if (err) return next(err);
      
      var qpeso = {
        peso: req.body.peso, 
        usuario: user._id};
      
      Peso.create(qpeso, function (err, peso) {
        if (err) return next(err);
        
        res.json(peso);      
      });
  });    
});

////////////////////////////////////////////////////

router.get('/:username/entrenamientos/rutinas', function(req, res, next) {
  var quser = {'username':req.params.username};
  Usuario.findOne(quser, function(err, user){
      if (err) return next(err);
      var qentre;
      //console.log("req.params.tipo", req.params.tipo);
      //console.log("req.params.tipo == undefined", req.params.tipo == undefined);      
      qentre = {usuario: user._id};
      
      Rutina.find(qentre).sort({fecha: -1}).exec(function (err, entres) {
        if (err) return next(err);
        res.json(entres);
      });
  });    
});

router.post('/:username/entrenamientos/rutinas', function(req, res, next) {
  var quser = {'username':req.params.username};
  Usuario.findOne(quser, function(err, user){
      if (err) return next(err);
      /*var qentre = {
        tipo: "vueltaplaza", 
        distanciaEnMetros: req.body.distanciaEnMetros,
        tiempoEnSegundos: req.body.tiempoEnSegundos,
        usuario: user._id};*/
      var qentre = {
        tipo: "rutinas", 
        usuario: user._id};
      
      Entrenamiento.create(qentre, function (err, entre) {
        if (err) return next(err);
        
        var qvuelta = req.body;
        qvuelta.entrenamiento = entre._id
        qvuelta.usuario = user._id;
        Rutina.create(qvuelta, function (err, vuelta) {
          if (err) return next(err);
          //console.log("vuelta", vuelta);
          res.json(vuelta);          
        });
      });
  });    
});

////////////////////////////////////////////////////
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
    //console.log("req.body", req.body);
    //console.log("post", post);
    Usuario.findById(post._id, function(err1, user){
      if (err1) return next(err1);
      res.json(user);
    });
    
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


//////////////////////////////////////////////////////////////////////////////////

router.get('/:username/logros', function(req, res, next) {
  var quser = {'username':req.params.username};
  Usuario.findOne(quser, function(err, user){
      if (err) return next(err);
      var qentre;
      //console.log("req.params.tipo", req.params.tipo);
      //console.log("req.params.tipo == undefined", req.params.tipo == undefined);      
      qentre = {usuario: user._id};
      
      Logro.find(qentre).sort({fecha: -1}).exec(function (err, entres) {
        if (err) return next(err);
        res.json(entres);
      });
  });
});

router.post('/:username/logros', function(req, res, next) {
  var query = {'username':req.params.username};
    //var query = {username: "fit"};    
    Usuario.findOne(query, function(err, user){  
      if (err) return next(err);
      if(user!=null){
        
        var logro = req.body;
        logro.usuario = user._id;

        Logro.create(logro, function (err, post) {
          if (err) return next(err);
          res.json(post);
        });
      }
    });
});

//////////////////////////////////////////////////////////////////////////////////

module.exports = router;
