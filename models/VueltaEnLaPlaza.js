var mongoose = require('mongoose');

var VueltaEnLaPlazaSchema = new mongoose.Schema({
  tracking: [{lat: Number, lng: Number}],
  distanciaEnMetros: Number, 
  inicio: Number, 
  fin: Number, 
  tiempoEnSegundos: Number, 
  velocidadEnMetrosSobreSegundos: Number,   
  calorias: Number, 
  entrenamiento:{type: mongoose.Schema.Types.ObjectId, ref: 'Entrenamiento'}
});

module.exports = mongoose.model('VueltaEnLaPlaza', VueltaEnLaPlazaSchema);
