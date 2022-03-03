const mongoose = require("mongoose");
const { Schema } = mongoose;

const clienteSchema = new Schema({
  nombre: String,
  apellido: String,
  dni: String,
  telefono: String,
  email: String,
});

mongoose.model("clientes", clienteSchema);
