const mongoose = require('mongoose');


const Turno = mongoose.model('turnos');

module.exports = app => {
  app.get('/api/turnos', async (req, res) => {
    console.info('Obteniendo turnos');
    const turnos = await Turno.find({}, function (err, turno){
      Turno.populate(turno, {path: "turnos"})
    });
    res.send(turnos);
  });



  app.get('/api/turnos/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const turno= await Turno.findById(id);

      if (turno) {
        res.send(turno);
      } else {
        res
          .status(404)
          .send({ mensaje: `El turno con id '${id}' no ha sido encontrado.` });
      }
    } catch (e) {
      res.status(500).send({ mensaje: `Error en el servidor.\n\n${e}` });
    }
  });

  app.post('/api/turnos', async (req, res) => {
    const { codigo, nombre } = req.body;

    const turno = new Turno({
      codigo,
      nombre
    });
    try {
      //objeto de mongose y puede demorar y espera hasta que termine y captura la exc
      let nuevoTurno = await turno.save();
      res.status(201).send(nuevoTurno);
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send(err.message);
      }
      res.status(500).send(err);
    }
  });

  app.put('/api/turnos/:id', async (req, res) => {
    const id = req.params.id;
    const datosTurno = req.body || {}; //objeto vacío 
   

    try {
      let turno = await Turno.findByIdAndUpdate({ _id: id }, datosTurno, {
        new: true
      });

      if (!turno) {
        res.status(404).send({
          mensaje: `Error cuando se actualizaba el turno con id ${id}.\n\n${e}`
        });
      } else {
        res.status(200).send(turno);
      }
    } catch (err) {
      if (err.name === 'MongoError') {
        res.status(409).send({ mensaje: err.message });
      }
      
      res.status(500).send({
        mensaje: `Error desconocido.\n\n Error desconocido cuando se actualizaba el turno id='${id}'`
      });
    }
  });

  app.delete('/api/turnos/:id', async (req, res) => {
    const id = req.params.id;

    try {
      let turno = await Turno.findByIdAndRemove({ _id: id });

      if (!turno) {
        return res.status(404).send({ mensaje: 'Turno no encontrado' });
      } else {
        return res.status(204).send({ message: 'Turno Eliminado' }); // 204 do not use content
      }
    } catch (err) {
      return res.status(500).send({
        mensaje: `Error desconocido cuando se borraba el turno con id '${id}'.`
      });
    }
  });


  

  // app.get('/api/servicios/consultap', async (req, res) => {
  //   try {
  //     var regExpTerm = new RegExp(req.query.consultap, 'i');
  //     var regExpSearch = [
  //       { codigo: { $regex: regExpTerm } },
  //       { nombre: { $regex: regExpTerm } },
        
        

  //     ];
  //     const servicios = await Servicio.find({ $or: regExpSearch });

  //     res.status(200).send(servicios);
  //   } catch (e) {
  //     res.status(500).send({ mensaje: e });
  //   }
  // });

};
