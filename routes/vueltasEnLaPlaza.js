var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VueltaEnLaPlaza = require('../models/VueltaEnLaPlaza.js');

/* GET ALL VueltaEnLaPlazaS */
router.get('/', function(req, res, next) {
  VueltaEnLaPlaza.find(function (err, VueltaEnLaPlazas) {
    if (err) return next(err);
    res.json(VueltaEnLaPlazas);
  });
});

/* GET SINGLE VueltaEnLaPlaza BY ID */
router.get('/:id', function(req, res, next) {
  VueltaEnLaPlaza.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE VueltaEnLaPlaza */
router.post('/', function(req, res, next) {
  VueltaEnLaPlaza.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE VueltaEnLaPlaza */
router.put('/:id', function(req, res, next) {
  VueltaEnLaPlaza.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE VueltaEnLaPlaza */
router.delete('/:id', function(req, res, next) {
  VueltaEnLaPlaza.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
