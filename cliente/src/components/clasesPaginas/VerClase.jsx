import React, { Component } from 'react';
import { connect } from 'react-redux';
import { buscarClasePorId } from '../../actions/AccionesClases';
import { Link } from 'react-router-dom';

class VerClase extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.id = id;
    if (id) {
      this.props.buscarClasePorId(id);
    }
  }

  render() {
    return (
      <div>
        <h2>Ver Clase</h2>

        <br />

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>TIPO CLASE:</p>
          </div>
          <div className='col-sm-10'>{this.props.clase.tipoClase}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Descripcion:</p>
          </div>
          <div className='col-sm-10'>{this.props.clase.descripcion}</div>
        </div>
{/* 
        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Finalizada:</p>
          </div>
          <div className='col-sm-10'>
            {this.props.tarea.estaFinalizada ? 'si' : 'no'}
          </div>
        </div> */}

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Fecha :</p>
          </div>
          <div className='col-sm-10'>{this.props.clase.fecha}</div>
        </div>

        <div className='row'>
          <div className='col-sm-2'>
            <p className='font-weight-bold text-right'>Hora :</p>
          </div>
          <div className='col-sm-10'>{this.props.clase.hora}</div>
        </div>

        <div className='row'>
          <Link className='btn btn-light mr-2' to='/clases'>
            Volver
          </Link>
          <Link
            to={`/clases/${this.id}/editar`}
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
    clase: state.clasesDs.clase
  };
}

const actions = {
  buscarClasePorId
};

export default connect(
  mapState,
  actions
)(VerClase);
