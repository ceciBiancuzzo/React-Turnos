import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarTurnos, eliminarTurnos } from '../../actions';
import { Link } from 'react-router-dom';

class ListarTurno extends Component {
  componentDidMount() {
    this.props.buscarTurnos();


  }

  crearFilas() {
    return this.props.listaTurnos.map(turno => {
      return (
        <tr key={turno._id}>
          
          <td>{turno.codigo}</td>
          <td>{turno.nombre}</td>


          <td>
            <Link to={`/turnos/${turno._id}/ver`} className='mr-2'>
              Ver
            </Link>
            <Link to={`/turnos/${turno._id}/editar`} className='mr-2'>
              Editar
            </Link>
            <a
              className='mr-2'
              href='#more'
              onClick={() => {
                if (
                  window.confirm(
                    '¿Está usted seguro que desea eliminar el turno?'
                  )
                )
                  this.props.eliminarTurnos(turno._id);

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
        <h2>Listando Turnos</h2>

        <p>
          <Link to='/turnos/nuevo' className='btn btn-primary'>
            Nuevo
          </Link>
        </p>

        <div className='table-responsive'>
          <table className='table table-striped table-sm'>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Nombre</th>

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
    listaTurnos: state.turnosDs.listaTurnos
  };
}

const actions = {
  buscarTurnos,
  eliminarTurnos
};

export default connect(
  mapState,
  actions
)(ListarTurno);
