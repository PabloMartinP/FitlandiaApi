var mongoose = require('mongoose');

var RutinaSchema = new mongoose.Schema({
  texto: String, 
  fecha: {
    type: Date,
    default: Date.now
  },
  usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('RutinaSchema', RutinaSchema);
