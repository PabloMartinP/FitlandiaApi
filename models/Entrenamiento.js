var mongoose = require('mongoose');

var EntrenamientoSchema = new mongoose.Schema({
  tipo: String,
  fecha: {
    type: Date,
    default: Date.now
  },
  comentario: String,   
  usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('Entrenamiento', EntrenamientoSchema);
 