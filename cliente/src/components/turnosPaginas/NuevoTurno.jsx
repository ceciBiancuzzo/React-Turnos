import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { nuevoTurno,guardarTurno} from '../../actions/AccionesTurnos';
import FormularioTurno from './FormularioTurno';

class NuevoTurno extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.props.nuevoTurno();
  }

  submit = turno => {
    return this.props
      .guardarTurno(turno)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Nuevo Turno</h2>

        {this.state.redirect ? (
          <Redirect to='/turnos' />
        ) : (
          <FormularioTurno turno={this.props.turno} onSubmit={this.submit} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    turno: state.turnosDs.turno,
    errores: state.turnosDs.errores
  };
}

export default connect(
  mapStateToProps,
  { nuevoTurno, guardarTurno }
)(NuevoTurno);
