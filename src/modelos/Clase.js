


const mongoose = require('mongoose');
const { Schema } = mongoose;

const claseSchema = new Schema({
  tipoClase: String,
  descripcion: String,
  fecha: Date,
  hora: Date,
  
});

mongoose.model('clases', claseSchema);
