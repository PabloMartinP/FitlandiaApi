var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Logro = require('../models/Logro.js');

/* GET ALL LogroS */
router.get('/', function(req, res, next) {
  Logro.find(function (err, Logros) {
    if (err) return next(err);
    res.json(Logros);
  });
});

/* GET SINGLE Logro BY ID */
router.get('/:id', function(req, res, next) {
  Logro.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Logro */
router.post('/', function(req, res, next) {
  Logro.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Logro */
router.put('/:id', function(req, res, next) {
  Logro.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Logro */
router.delete('/:id', function(req, res, next) {
  Logro.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
