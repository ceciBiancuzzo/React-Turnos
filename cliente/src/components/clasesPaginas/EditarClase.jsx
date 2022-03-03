import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import FormularioClase from './FormularioClase';
import {
  buscarClasePorId,
  actualizarClase} from '../../actions/AccionesClases';

class EditarClase extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.buscarClasePorId(id);
    }
  }

  submit = clase => {
    return this.props
      .actualizarClase(clase)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Editar clase</h2>
        <div>
          {this.state.redirect ? (
            <Redirect to='/clases' />
          ) : (
            <FormularioClase
              clase={this.props.clase}
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
    clase: state.clasesDs.clase,
    cargando: state.clasesDs.cargando,
    errore: state.clasesDs.errores
  };
}

export default connect(
  mapStateToProps,
  { buscarClasePorId, actualizarClase }
)(EditarClase);
