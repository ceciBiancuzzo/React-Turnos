import React, { Component } from "react";
import { connect } from "react-redux";
import { buscarTurnoPorId } from "../../actions/AccionesTurnos";
import { Link } from "react-router-dom";
import Bienvenidos from "../reservaTurnosPaginas/ReservaTurnos";

class VerTurno extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.id = id;
    if (id) {
      this.props.buscarTurnoPorId(id);
    }
  }

  render() {
    return (
      <div>
        <h2>Ver Turno</h2>

        <div className="row">
          <div className="col-sm-2">
            <p className="font-weight-bold text-right">Código:</p>
          </div>
          <div className="col-sm-10">{this.props.turno.codigo}</div>
        </div>

        <div className="row">
          <div className="col-sm-2">
            <p className="font-weight-bold text-right">Nombre:</p>
          </div>
          <div className="col-sm-10">{this.props.turno.nombre}</div>
        </div>

        <div className="row">
          <div className="col-sm-2">
            <p className="font-weight-bold text-right">Fecha modificación:</p>
          </div>
          <div className="col-sm-10">{this.props.turno.fecha}</div>
        </div>

        <div className="row">
          <Link className="btn btn-light mr-2" to="/turnos">
            Volver
          </Link>
          <Link
            to={`/turnos/${this.id}/editar`}
            className="btn btn-secondary mr-2"
          >
            Editar
          </Link>
          &nbsp;
        </div>
        <Bienvenidos className="btn btn-warning" />
      </div>
    );
  }
}

function mapState(state) {
  return {
    turno: state.turnosDs.turno,
  };
}

const actions = {
  buscarTurnoPorId,
};

export default connect(mapState, actions)
(VerTurno);
