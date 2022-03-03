import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarClientes, eliminarClientes } from '../../actions';
import { Link } from 'react-router-dom';

class ListarCliente extends Component {
  componentDidMount() {
    this.props.buscarClientes();
    
    
  }

  crearFilas() {
    return this.props.listaClientes.map(cliente => {
      return (
        <tr key={cliente._id}>

          <td>{cliente.nombre}</td>
          <td>{cliente.apellido}</td>
          <td>{cliente.dni}</td>
          <td>{cliente.telefono}</td>
          <td>{cliente.email}</td>
        
         
          <td>
            <Link to={`/clientes/${cliente._id}/ver`} className='mr-2'>
              Ver
            </Link>
            <Link to={`/clientes/${cliente._id}/editar`} className='mr-2'>
              Editar
            </Link>
            <a
              className='mr-2'
              href='#more'
              onClick={() => {
                if (
                  window.confirm(
                    '¿Está usted seguro que desea eliminar el cliente?'
                  )
                )
                  this.props.eliminarClientes(cliente._id);

              }}
            >
              Eliminar
            </a>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Listando Clientes</h2>

        <p>
          <Link to='/clientes/nuevo' className='btn btn-primary'>
            Nuevo
          </Link>
        </p>

        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Dni</th>
                <th>Telefono</th>
                <th>Email</th>
                <th>Acciones</th>
             </tr>
            </thead>
            <tbody>{this.crearFilas()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    listaClientes: state.clientesDs.listaClientes
  };
}

const actions = {
  buscarClientes,
  eliminarClientes
};

export default connect(
  mapState,
  actions
)(ListarCliente);
