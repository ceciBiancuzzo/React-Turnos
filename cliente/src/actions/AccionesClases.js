import axios from 'axios';
import { tiposClases } from './types';

export const buscarClases = () => async dispatch => {
  dispatch({ type: tiposClases.BUSCAR_CLASES_PENDIENTE });

  try {
    var res = await axios.get('/api/clases');
    dispatch({ type: tiposClases.BUSCAR_CLASES_TERMINADA, payload: res });
  } catch (error) {
    dispatch({ type: tiposClases.BUSCAR_CLASES_RECHAZADA, payload: error });
  }
};

export const nuevaClase = () => async dispatch => {
  dispatch({ type: tiposClases.NUEVA_CLASE });
};

export const guardarClase = clase => async dispatch => {
  var res = await axios.post('/api/clases', clase);
  dispatch({ type: tiposClases.GUARDAR_CLASE, payload: res });
};

export const buscarClasePorId = id => async dispatch => {
  dispatch({ type: tiposClases.BUSCAR_CLASES_POR_ID_PENDIENTE });

  try {
    const res = await axios.get('/api/clases/' + id);
    dispatch({
      type: tiposClases.BUSCAR_CLASES_POR_ID_TERMINADA,
      payload: res
    });
  } catch (error) {
    dispatch({ type: tiposClases.BUSCAR_CLASES_POR_ID_RECHAZADA });
  }
};

export const actualizarClase = clase => async dispatch => {
  const res = await axios.put(`/api/clases/${clase._id}`, clase);
  return dispatch({
    type: tiposClases.ACTUALIZAR_CLASE,
    payload: res
  });
};

export const eliminarClases = id => async dispatch => {
  
  let res = await axios.delete(`/api/clases/${id}`);

  if (res.status === 204) {
    res._id = id;
  }

  return dispatch({
    type: tiposClases.ELIMINAR_CLASE,
    payload: res
  });
};