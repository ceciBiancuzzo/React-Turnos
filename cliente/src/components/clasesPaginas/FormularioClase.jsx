import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const validaciones = (valores) => {
  const errores = {};
  if (!valores.tipoClase) {
    errores.tipoClase = "tipoClase es requerido";
  } else if (valores.tipoClase && valores.tipoClase.length < 5) {
    errores.tipoClase = "Debe contener al menos 5 caracteres";
  }
  // if (!values.email) {
  //   errors.email = 'Required'
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Invalid email address'
  // }
  // if (!values.age) {
  //   errors.age = 'Required'
  // } else if (isNaN(Number(values.age))) {
  //   errors.age = 'Must be a number'
  // } else if (Number(values.age) < 18) {
  //   errors.age = 'Sorry, you must be at least 18 years old'
  // }
  return errores;
};

class FormularioClase extends Component {
  state() {
    fecha: new Date();
  }

  componentWillReceiveProps = (nextProps) => {
    // Load Contact Asynchronously

    const { clase } = nextProps;

    if (clase._id !== this.props.clase._id) {
      // Initialize form only once
      this.props.initialize(clase);
      this.estaActualizando = true;
    }
  };

  onChange = (fecha) => {
    // this.setState({ date });
    //format(date.createdAt)
    // console.log(date.toTimeString());
    this.setState({ fecha: fecha });
    console.log(fecha.toDateString());
  };

  onChangeT = (hora) => {
    // this.setState({ date });
    //format(date.createdAt)
    // console.log(date.toTimeString());
    this.setState({ hora: hora });
    console.log(hora.toTimeString());
  };

  // onChangTime = (time) => {
  //   // <- prints "3600" if "01:00" is picked
  //   //this.setState({ time });
  // };

  // obtenerFecha = (e) => {
  //   this.fecha(e);
  //   console.log("Fecha original:" + this.fecha);
  //   console.log("Fecha formateada es: " + this.fecha.format("DD/MM/YYYY"));
  // };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className="form-group">
      <label forname={input.name}>{label}</label>
      <input
        {...input}
        type={type}
        className="form-control"
        id={input.name}
        placeholder={input.label}
      />
      <div className="text-danger" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );

  render() {
    const { handleSubmit, cargando } = this.props;

    if (cargando) {
      return <span>Cargando...</span>;
    }

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="tipoClase"
          type="text"
          component={this.renderField}
          label="Tipo de Clase"
        />
        <Field
          name="descripcion"
          type="text"
          component={this.renderField}
          label="Descripcion"
        />
        <div>
          Seleccione fecha <br />
          <DatePicker
            type="date"
            label="DateTimePicker"
            dateFormat="MM/dd/YYYY"
            selected={this.state.fecha}
            onChange={this.onChange}
          />
        </div>
        {/* <div>
          Seleccione hora <br />
          <TimePiker
            type="time"
            label="DateTimePicker"
            selected={this.state.fecha}
            onChange={this.onChange}
          />
        </div> */}

        <div className="time-picker-1">
          <label for="input_starttime">Seleccione hora</label>
          <input
            placeholder="Selected time"
            type="time"
            class="form-control timepicker"
            onChangeT={this.onChangeT}
            selected={this.state.hora}
          />
        </div>

        <Link className="btn btn-light mr-2" to="/clases">
          Cancelar
        </Link>
        <button className="btn btn-primary mr-2" type="submit">
          {this.estaActualizando ? "Actualizar" : "Crear"}
        </button>
      </form>
    );
  }
}

export default reduxForm({ form: "clase", validate: validaciones })(
  FormularioClase
);
