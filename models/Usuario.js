var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
  username: {type: String, index: true, unique: true, required: true},
  password: String, 
  peso: Number, 
  altura: Number,
  foto:{type: mongoose.Schema.Types.ObjectId, ref: 'Foto'}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
