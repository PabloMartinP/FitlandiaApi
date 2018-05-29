var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Foto = require('../models/Foto.js');
var fs = require('fs');
var os = require("os");

//var multer  = require('multer');
//var upload = multer({ dest: 'uploads/' });

var dir = "subidas/";

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
    Foto.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
    Foto.findById(req.params.id, function (err, post) {
    if (err) return next(err);

    

    res.json(post);
  });
});


router.post('/',  function(req, res, next) {
  if (!req.files)
  return res.status(400).send('No files were uploaded.' + req.files + "_");

  console.log(req.files.foto.name);
  var hostname = os.hostname();
  //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var fullUrl = req.protocol + '://' + req.get('host') + "/";//+ req.originalUrl;

  //console.log("hostname", fullUrl);

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let foto = req.files.foto;

  if(!fs.existsSync(dir))
    fs.mkdirSync(dir);
  var url = dir + req.files.foto.name;
  foto.mv(url, function(err) {
    if (err)
      return res.status(500).send(err);
  
    Foto.create({nombre: req.body.nombre,url: fullUrl+ url, foto: foto.data}, function (err, post) {
      if (err) return next(err);
        res.json(post);
      });
  });
  
  
  
  

    


/*
sampleFile.mv('filename1.jpg', function(err) {
  if (err)
    return res.status(500).send(err); 

    console.log(sampleFile);
    var bitmap = fs.readFileSync('filename1.jpg');
    // convert binary data to base64 encoded string
    var b = new Buffer(bitmap).toString('base64');
  
    
    Foto.create({nombre: req.body.nombre, foto: b}, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });    
  });*/

  

/*sampleFile.mv('filename1.jpg', function(err) {
  if (err)
    return res.status(500).send(err); 
  });*/

  
});

/* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
    Foto.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
    Foto.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
