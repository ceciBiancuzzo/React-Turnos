const mongoose = require("mongoose");

const Clase = mongoose.model("clases");

module.exports = (app) => {
  app.get("/api/clases", async (req, res) => {
    console.info("Obteniendo clases");
    const clases = await Clase.find({});
    res.send(clases);
  });

  app.get("/api/clases/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const clase = await Clase.findById(id);

      if (clase) {
        res.send(clase);
      } else {
        res
          .status(404)
          .send({ mensaje: `La clase con id '${id}' no ha sido encontrada.` });
      }
    } catch (e) {
      res.status(500).send({ mensaje: `Error en el servidor.\n\n${e}` });
    }
  });

  app.post("/api/clases", async (req, res) => {
    const { tipoClase, descripcion, fecha, hora } = req.body;

    const clase = new Clase({
      tipoClase,
      descripcion,
      fecha,
      hora,
    });

    try {
      let nuevaClase = await clase.save();

      res.status(201).send(nuevaClase);
    } catch (err) {
      if (err.name === "MongoError") {
        res.status(409).send(err.message);
      }

      res.status(500).send(err);
    }
  });

  app.put("/api/clases/:id", async (req, res) => {
    const id = req.params.id;

    const datosClase = req.body || {};

    try {
      let clase = await Clase.findByIdAndUpdate({ _id: id }, datosClase, {
        new: true,
      });

      if (!clase) {
        res.status(404).send({
          mensaje: `Error cuando se actualizaba la clase con id ${id}.\n\n${e}`,
        });
      } else {
        res.status(200).send(clase);
      }
    } catch (err) {
      if (err.name === "MongoError") {
        res.status(409).send({ mensaje: err.message });
      }
      res.status(500).send({
        mensaje: `Error desconocido.\n\n Error desconocido cuando se actualizaba la clase id='${id}'`,
      });
    }
  });

  app.delete("/api/clases/:id", async (req, res) => {
    const id = req.params.id;

    try {
      let clase = await Clase.findByIdAndRemove({ _id: id });

      if (!clase) {
        return res.status(404).send({ mensaje: "Clase no encontrada" });
      } else {
        return res.status(204).send({ message: "Clase Eliminada" }); // 204 do not use content
      }
    } catch (err) {
      return res.status(500).send({
        mensaje: `Error desconocido cuando se borraba la clase con id '${id}'.`,
      });
    }
  });

  /*  app.put( '/api/clases/:id/estaFinalizada/cambiar', async (req, res) => {
    const id = req.params.id; 

    const clase = await Clase.findOne({ _id: id });

    if (!clase) {
      return res.status(404).send({
        mensaje: `La clase con id ${id} no ha sido encontrada.\n\n${e}`
      });
    }

    if (clase) {
      
     
      res.status(200).send(tarea);
    }
  }); */
  //aca

  /* app.get('/api/clases/consulta', async (req, res) => {
    try {
      var regExpTerm = new RegExp(req.query.consulta, 'i');
      var regExpSearch = [
        { nombre: { $regex: regExpTerm } },
        { descripcion: { $regex: regExpTerm } }
      ];
      const tareas = await Tarea.find({ $or: regExpSearch });

      res.status(200).send(tareas);
    } catch (e) {
      res.status(500).send({ mensaje: e });
    }
  }); */
};
