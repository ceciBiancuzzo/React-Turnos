import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import { nuevoCliente, guardarCliente} from '../../actions/AccionesClientes';
import FormularioCliente from './FormularioCliente';

class NuevoCliente extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    this.props.nuevoCliente();
  }

  submit = cliente => {
    return this.props
      .guardarCliente(cliente)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>
        <h2>Nuevo Cliente</h2>

        {this.state.redirect ? (
          <Redirect to='/clientes' />
        ) : (
          <FormularioCliente cliente={this.props.cliente} onSubmit={this.submit} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cliente: state.clientesDs.cliente,
    errores: state.clientesDs.errores
  };
}

export default connect(
  mapStateToProps,
  { nuevoCliente, guardarCliente }
)(NuevoCliente);
