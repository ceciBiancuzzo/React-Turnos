import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import { SubmissionError } from 'redux-form';
import FormularioCliente from './FormularioCliente';
import { buscarClientePorId,actualizarCliente} from '../../actions/AccionesClientes';

class EditarCliente extends Component {
  state = {
    redirect: false
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.props.buscarClientePorId(id);
    }
  }

  submit = cliente => {
    return this.props
      .actualizarCliente(cliente)
      .then(response => this.setState({ redirect: true }))
      .catch(err => {
        throw new SubmissionError(this.props.errores);
      });
  };

  render() {
    return (
      <div>

        <h2>Editar Cliente</h2>
        <div>
          {this.state.redirect ? (
            <Redirect to='/clientes' />
          ) : (
              <FormularioCliente
                cliente={this.props.cliente}
                cargando={this.props.cargando}
                onSubmit={this.submit}
              />
            )

          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cliente: state.clientesDs.cliente,
    cargando: state.clientesDs.cargando,
    errore: state.clientesDs.errores
  };
}

export default connect(
  mapStateToProps,
  { buscarClientePorId, actualizarCliente }
)(EditarCliente);
