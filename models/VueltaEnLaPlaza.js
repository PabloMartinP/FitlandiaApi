var mongoose = require('mongoose');

var VueltaEnLaPlazaSchema = new mongoose.Schema({
  tracking: [{lat: Number, lng: Number}],
  entrenamiento:{type: mongoose.Schema.Types.ObjectId, ref: 'Entrenamiento'}
});

module.exports = mongoose.model('VueltaEnLaPlaza', VueltaEnLaPlazaSchema);
