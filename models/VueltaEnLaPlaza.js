var mongoose = require('mongoose');

var VueltaEnLaPlazaSchema = new mongoose.Schema({
  tracking: [{lat: Number, lng: Number}],
  distanciaEnMetros: Number, 
  inicio: Number, 
  fin: Number, 
  tiempoEnSegundos: Number, 
  velocidadEnMetrosSobreSegundos: Number,   
  entrenamiento:{type: mongoose.Schema.Types.ObjectId, ref: 'Entrenamiento'},
  fecha: {
    type: Date,
    default: Date.now
  },
  usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('VueltaEnLaPlaza', VueltaEnLaPlazaSchema);
