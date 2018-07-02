var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Peso = require('../models/LogPeso.js');

/* GET ALL PesoS */
router.get('/', function(req, res, next) {
  Peso.find(function (err, Pesos) {
    if (err) return next(err);
    res.json(Pesos);
  });
});

/* GET SINGLE Peso BY ID */
router.get('/:id', function(req, res, next) {
  Peso.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Peso */
router.post('/', function(req, res, next) {
  Peso.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Peso */
router.put('/:id', function(req, res, next) {
  Peso.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Peso */
router.delete('/:id', function(req, res, next) {
  Peso.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
