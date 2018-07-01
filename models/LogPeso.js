var mongoose = require('mongoose');

var LogPesoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    default: Date.now
  },
  peso: Number, 
  usuario:{type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('LogPeso', LogPesoSchema);
