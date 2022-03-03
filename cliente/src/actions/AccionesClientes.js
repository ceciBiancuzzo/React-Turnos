import axios from "axios";
import { tiposClientes } from "./types";

export const buscarClientes = () => async (dispatch) => {
  dispatch({ type: tiposClientes.BUSCAR_CLIENTES_PENDIENTE });

  try {
    let res = await axios.get("/api/clientes");
    dispatch({ type: tiposClientes.BUSCAR_CLIENTES_TERMINADA, payload: res });
  } catch (error) {
    dispatch({ type: tiposClientes.BUSCAR_CLIENTES_RECHAZADA, payload: error });
  }
};

export const nuevoCliente = () => async (dispatch) => {
  dispatch({ type: tiposClientes.NUEVO_CLIENTE });
};

export const guardarCliente = (cliente) => async (dispatch) => {
  let res = await axios.post("/api/clientes/", cliente);
  dispatch({ type: tiposClientes.GUARDAR_CLIENTE, payload: res });
};

export const buscarClientePorId = (id) => async (dispatch) => {
  dispatch({ type: tiposClientes.BUSCAR_CLIENTES_POR_ID_PENDIENTE });

  try {
    let res = await axios.get("/api/clientes/" + id);
    dispatch({
      type: tiposClientes.BUSCAR_CLIENTES_POR_ID_TERMINADA,
      payload: res,
    });
  } catch (error) {
    dispatch({ type: tiposClientes.BUSCAR_CLIENTES_POR_ID_RECHAZADA });
  }
};

export const actualizarCliente = (cliente) => async (dispatch) => {
  let res = await axios.put(`/api/clientes/${cliente._id}`, cliente);
  return dispatch({
    type: tiposClientes.ACTUALIZAR_CLIENTE,
    payload: res,
  });
};

export const eliminarClientes = (id) => async (dispatch) => {  //aca
  let res = await axios.delete(`/api/clientes/${id}`);

  if (res.status === 204) {
    res._id = id;
  }

  return dispatch({
    type: tiposClientes.ELIMINAR_CLIENTE,
    payload: res,
  });
};
