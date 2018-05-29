var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = require('../models/Usuario.js');

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
