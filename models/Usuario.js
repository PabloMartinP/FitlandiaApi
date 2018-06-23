var mongoose = require('mongoose');

var UsuarioSchema = new mongoose.Schema({
  username: {type: String, index: true, unique: true, required: true},
  password: String, 
  peso: Number, 
  altura: Number,
  foto:{type: mongoose.Schema.Types.ObjectId, ref: 'Foto'}, 
  edad:Number, 
  cintura: Number, 
  cuello: Number, 
  cadera: Number
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
