import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { SubmissionError } from "redux-form";
import FormularioTurno from "./FormularioTurno";
import {
  buscarTurnoPorId,
  actualizarTurno,
} from "../../actions/AccionesTurnos";

class EditarTurno extends Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.buscarTurnoPorId(id);
    }
  }

  submit = (turno) => {
    return this.props
      .actualizarTurno(turno)
      .then((response) => this.setState({ redirect: true }))
      .catch((err) => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Editar Turno</h2>
        <div>
          {this.state.redirect ? (
            <Redirect to="/turnos" />
          ) : (
            <FormularioTurno
              turno={this.props.turno}
              cargando={this.props.cargando}
              onSubmit={this.submit}
            />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    turno: state.turnosDs.turno,
    cargando: state.turnosDs.cargando,
    errore: state.turnosDs.errores,
  };
}

export default connect(mapStateToProps, { buscarTurnoPorId, actualizarTurno })(
  EditarTurno
);
