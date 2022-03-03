import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarClientePorId } from '../../actions/AccionesClientes';
import { Link } from 'react-router-dom';
//import ReservaTurnos from '../reservaTurnosPaginas/ReservaTurnos';


class VerCliente extends Component {    
  componentDidMount() {
    const { id } = this.props.match.params;
    this.id = id;
    if (id) {
      this.props.buscarClientePorId(id);
    }
  }

  render() {
    return (
      <div>
        <h2>Ver Cliente</h2>


        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Nombre:</p>
          </div>
          <div className='col-sm-10'>{this.props.cliente.nombre}</div>
        </div>
        

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Marca:</p>
          </div>
          <div className='col-sm-10'>{this.props.cliente.marca}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Precio:</p>
          </div>
          <div className='col-sm-10'>{this.props.cliente.precio}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Descripcion:</p>
          </div>
          <div className='col-sm-10'>{this.props.cliente.descripcion}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Fecha ingreso:</p>
          </div>
          <div className='col-sm-10'>{this.props.cliente.fechaCreacion}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Última modificación:</p>
          </div>
          <div className='col-sm-10'>{this.props.cliente.fechaActualizacion}</div>
        </div>


        <div className='row'>
          <Link className='btn btn-light mr-2' to='/clientes'>
            Volver
          </Link>
          <Link
            to={`/clientes/${this.id}/editar`}
            className='btn btn-secondary mr-2'
          >
            Editar
           </Link>
          &nbsp;
          </div>
        
      
      </div>
    );
  }
}

function mapState(state) {
  return {
    cliente: state.clientesDs.cliente
  };
}

const actions = {
  buscarClientePorId
};

export default connect(
  mapState,
  actions
)(VerCliente);
