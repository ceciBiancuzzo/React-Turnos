import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarClases, eliminarClases } from '../../actions';
import { Link } from 'react-router-dom';

class ListarClase extends Component {
  componentDidMount() {
    this.props.buscarClases();
  }

  crearFilas() {
    return this.props.listaClases.map(clase => {
      return (
        <tr key={clase._id}>
          
          <td>{clase.tipoClase}</td>
          <td>{clase.descripcion}</td>
          <td>{clase.fecha}</td>
          <td>{clase.hora}</td>
          <td>
            <Link to={`/clases/${clase._id}/ver`} className='mr-2'>
              Ver
            </Link>
            <Link to={`/clases/${clase._id}/editar`} className='mr-2'>
              Editar
            </Link>
            <a
              className='mr-2'
              href='#more'
              onClick={() => {
                if (
                  window.confirm(
                    '¿Está usted seguro que desea eliminar la clase?'
                  )
                )
                  this.props.eliminarClases(clase._id);
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
        <h2>Listando Clases</h2>

        <p>
          <Link to='/clases/nueva' className='btn btn-primary'>
            Nuevo
          </Link>
        </p>

        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>TipoClase</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Hora</th>
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
    listaClases: state.clasesDs.listaClases
  };
}

const actions = {
  buscarClases,
  eliminarClases
};

export default connect(
  mapState,
  actions
)(ListarClase);
