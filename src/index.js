const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./modelos/Clase");
require("./modelos/Cliente");
require("./modelos/Servicio");

const MONGO_URI = `mongodb://localhost:27017/gim2022`;
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });

const app = express();
app.use(bodyParser.json());

require("./controladores/ClasesControlador")(app);

require("./controladores/ClientesControlador")(app);

require("./controladores/ServiciosControlador")(app);
const PORT = 5000;
app.listen(PORT, () => console.info(`Iniciando en puerto ${PORT}`));
