import axios from 'axios';
import { tiposTurnos } from './types';

export const buscarTurnos = () => async dispatch => {
  dispatch({ type: tiposTurnos.BUSCAR_TURNOS_PENDIENTE });

  try {
    var res = await axios.get('/api/servicios');
    dispatch({ type: tiposTurnos.BUSCAR_TURNOS_TERMINADA, payload: res });
  } catch (error) {
    dispatch({ type: tiposTurnos.BUSCAR_TURNOS_RECHAZADA, payload: error });
  }
};

export const nuevoTurno = () => async dispatch => {
  dispatch({ type: tiposTurnos.NUEVO_TURNO });
};

export const guardarTurno = servicio => async dispatch => {
  var res = await axios.post('/api/servicios', servicio);
  dispatch({ type: tiposTurnos.GUARDAR_TURNO, payload: res });
};

export const buscarTurnoPorId = id => async dispatch => {
  dispatch({ type: tiposTurnos.BUSCAR_TURNOS_POR_ID_PENDIENTE });

  try {
    const res = await axios.get('/api/servicios/' + id);
    dispatch({
      type: tiposTurnos.BUSCAR_TURNOS_POR_ID_TERMINADA,
      payload: res
    });
  } catch (error) {
    dispatch({ type: tiposTurnos.BUSCAR_TURNOS_POR_ID_RECHAZADA });
  }
};

export const actualizarTurno = turno => async dispatch => {
  const res = await axios.put(`/api/turnos/${turno._id}`, turno);
  return dispatch({
    type: tiposTurnos.ACTUALIZAR_TURNO,
    payload: res
  });
};

export const eliminarTurnos = id => async dispatch => {
  
  let res = await axios.delete(`/api/turnos/${id}`);

  if (res.status === 204) {
    res._id = id;
  }

  return dispatch({
    type: tiposTurnos.ELIMINAR_TURNO,
    payload: res
  });
};