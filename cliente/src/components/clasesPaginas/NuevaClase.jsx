import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { nuevaClase, guardarClase } from '../../actions/AccionesClases';
import FormularioClase from './FormularioClase';

class NuevaClase extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.props.nuevaClase();
  }

  submit = clase => {
    return this.props
      .guardarClase(clase)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Nueva Clase</h2>

        {this.state.redirect ? (
          <Redirect to='/clases' />
        ) : (
          <FormularioClase clase={this.props.clase} onSubmit={this.submit} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clase: state.clasesDs.clase,
    errores: state.clasesDs.errores
  };
}

export default connect(
  mapStateToProps,
  { nuevaClase, guardarClase }
)(NuevaClase);
