var mongoose = require('mongoose');

var LogroSchema = new mongoose.Schema({
  usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
  foto:{type: mongoose.Schema.Types.ObjectId, ref: 'Foto'}, 
  fecha: {
    type: Date,
    default: Date.now
  },
  comentario: String
});

module.exports = mongoose.model('Logro', LogroSchema);
