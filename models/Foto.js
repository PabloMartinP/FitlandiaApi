var mongoose = require('mongoose');

var FotoSchema = new mongoose.Schema({
  nombre: String,
  url: String, 
  base64: String, 
  foto: { data: Buffer, contentType: String}

  //foto: { type: Buffer, required: false}
});

module.exports = mongoose.model('Foto', FotoSchema);
 