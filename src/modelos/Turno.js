const mongoose = require("mongoose");
const { Schema } = mongoose;

const turnoSchema = new Schema({
  // cliente: { type: Schema.ObjectId, ref: "Cliente" },
  //clase: { type: Schema.ObjectId, ref: "CLASE" },
  // estado: String,
  //detalle: String,
  codigo: String,
  nombre: String,
});

mongoose.model("turnos", turnoSchema);
module.exports = mongoose.model("Turnos", turnoSchema);
