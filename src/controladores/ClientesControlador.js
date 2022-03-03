const mongoose = require("mongoose");

const Cliente = mongoose.model("clientes");

module.exports = (app) => {
  app.get("/api/clientes", async (req, res) => {
    console.info("Obteniendo clientes");
    const clientes = await Cliente.find({});
    res.send(clientes);
  });

  app.get("/api/clientes/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const cliente = await Cliente.findById(id);

      if (cliente) {
        res.send(cliente);
      } else {
        res
          .status(404)
          .send({
            mensaje: `El cliente con id '${id}' no ha sido encontrado.`,
          });
      }
    } catch (e) {
      res.status(500).send({ mensaje: `Error en el servidor.\n\n${e}` });
    }
  });

  app.post("/api/clientes/", async (req, res) => {
    const {
  nombre,
  apellido,
  dni,
  telefono,
  email,
  
    } = req.body;

    const cliente = new Cliente({
      nombre,
      apellido,
      dni,
      telefono,
      email,
    });
    try {
      //objeto de mongose y puede demorar y espera hasta que termine y captura la exc
      let nuevoCliente = await cliente.save();
      res.status(201).send(nuevoCliente);
    } catch (err) {
      if (err.name === "MongoError") {
        res.status(409).send(err.message);
      }
      res.status(500).send(err);
    }
  });

  app.put("/api/clientes/:id", async (req, res) => {
    const id = req.params.id;
    const datosCliente = req.body || {}; //objeto vacío
    delete datosCliente.fechaCreacion;
    datosCliente.fechaActualizacion = new Date();

    try {
      let cliente = await Cliente.findByIdAndUpdate({ _id: id }, datosCliente, {
        new: true,
      });

      if (!cliente) {
        res.status(404).send({
          mensaje: `Error cuando se actualizaba el cliente con id ${id}.\n\n${e}`,
        });
      } else {
        res.status(200).send(cliente);
      }
    } catch (err) {
      if (err.name === "MongoError") {
        res.status(409).send({ mensaje: err.message });
      }

      res.status(500).send({
        mensaje: `Error desconocido.\n\n Error desconocido cuando se actualizaba el cliente id='${id}'`,
      });
    }
  });

  app.delete("/api/clientes/:id", async (req, res) => {
    const id = req.params.id;

    try {
      let cliente = await Cliente.findByIdAndRemove({ _id: id });

      if (!cliente) {
        return res.status(404).send({ mensaje: "Cliente no encontrado" });
      } else {
        return res.status(204).send({ message: "Cliente Eliminado" }); // 204 do not use content
      }
    } catch (err) {
      return res.status(500).send({
        mensaje: `Error desconocido cuando se borraba el cliente con id '${id}'.`,
      });
    }
  });

  app.get("/api/clientes/consultac", async (req, res) => {
    try {
      var regExpTerm = new RegExp(req.query.consultac, "i");
      var regExpSearch = [
        { nombre: { $regex: regExpTerm } },
        { apellido: { $regex: regExpTerm } },
        { dni: { $regex: regExpTerm } },
        { telefono: { $regex: regExpTerm } },
        { email: { $regex: regExpTerm } },
        { fechaNacimiento: { $regex: regExpTerm } },
   
      ];
      const clientes = await Cliente.find({ $or: regExpSearch });

      res.status(200).send(clientes);
    } catch (e) {
      res.status(500).send({ mensaje: e });
    }
  });
};
