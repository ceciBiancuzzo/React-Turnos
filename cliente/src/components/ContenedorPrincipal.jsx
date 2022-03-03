import React, { Component } from "react";
import { Route } from "react-router-dom";

import ReservaTurnos from "./reservaTurnosPaginas/ReservaTurnos";
import ListarClase from "./clasesPaginas/ListarClase";
import NuevaClase from "./clasesPaginas/NuevaClase";
import VerClase from "./clasesPaginas/VerClase";
import EditarClase from "./clasesPaginas/EditarClase";

import ListarCliente from "./clientesPaginas/ListarCliente";
import NuevoCliente from "./clientesPaginas/NuevoCliente";
import VerCliente from "./clientesPaginas/VerCliente";
import EditarCliente from "./clientesPaginas/EditarCliente";

import ListarTurno from "./turnosPaginas/ListarTurno";
import NuevoTurno from "./turnosPaginas/NuevoTurno";
import VerTurno from "./turnosPaginas/VerTurno";
import EditarTurno from "./turnosPaginas/EditarTurno";

class ContenedorPrincipal extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <Route exact path="/" component={ReservaTurnos} />
            <Route exact path="/clases" component={ListarClase} />
            <Route exact path="/clases/nueva" component={NuevaClase} />
            <Route exact path="/clases/:id/ver" component={VerClase} />
            <Route exact path="/clases/:id/editar" component={EditarClase} />

            <Route exact path="/clientes" component={ListarCliente} />
            <Route exact path="/clientes/nuevo" component={NuevoCliente} />
            <Route exact path="/clientes/:id/ver" component={VerCliente} />
            <Route
              exact
              path="/clientes/:id/editar"
              component={EditarCliente}
            />

            <Route exact path="/turnos" component={ListarTurno} />
            <Route exact path="/turnos/nuevo" component={NuevoTurno} />
            <Route exact path="/turnos/:id/ver" component={VerTurno} />
            <Route exact path="/turnos/:id/editar" component={EditarTurno} />
          </main>
        </div>
      </div>
    );
  }
}

export default ContenedorPrincipal;
