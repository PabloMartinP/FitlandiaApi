var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Foto = require('../models/Foto.js');
var fs = require('fs');
var os = require("os");

var dir = "subidas/";
//var multer  = require('multer');
//var upload = multer({ dest: 'uploads/' });


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

  var hostname = os.hostname();
  //var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var fullUrl = req.protocol + '://' + req.get('host') + "/";//+ req.originalUrl;

  //console.log("hostname", fullUrl);

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let foto = req.files.foto;
  var contentType = foto.mimetype;
  console.log(foto)
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
    Foto.create(f, function (err, post) {
      if (err) return next(err);
        res.json(post);
      });
  });

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
