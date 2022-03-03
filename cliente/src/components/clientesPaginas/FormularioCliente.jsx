import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

const validaciones = valores => {
  const errores = {};
  if (!valores.nombre) {
    errores.nombre = 'Nombre es requerido';
  } else if (valores.nombre && valores.nombre.length < 5) {
    errores.nombre = 'Debe contener al menos 5 caracteres';
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

class FormularioCliente extends Component {

  
componentWillReceiveProps = nextProps => {
    // Load Contact Asynchronously
    const { cliente } = nextProps;
   if (cliente._id !== this.props.cliente._id) {
      // Initialize form only once
      this.props.initialize(cliente);
      //this.setState();
     this.estaActualizando = true;
    
  };
}
  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div className='form-group'>
      <label forname={input.name}>{label}</label>
      <input
        {...input}
        type={type}
        className='form-control'
        id={input.name}
        placeholder={input.label}
      />
      <div className='text-danger' style={{ marginBottom: '20px' }}>
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
          name='nombre'
          type='text'
          component={this.renderField}
          label='Nombre'
        />
        <Field
          name='apellido'
          type='text'
          component={this.renderField}
          label='Apellido'
        />
        <Field
          name='dni'
          type='number'
          component={this.renderField}
          label='Dni'
        />
        <Field
          name='telefono'
          type='text'
          component={this.renderField}
          label='Telefono'
        />
          <Field
          name='email'
          type='text'
          component={this.renderField}
          label='email'
        />
        
        <Link className='btn btn-light mr-2' to='/clientes'>
          Cancelar
        </Link>
        <button className='btn btn-primary mr-2' type='submit'>
          {this.estaActualizando ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    );
  }
}

export default reduxForm({ form: 'cliente', validate: validaciones })(
  FormularioCliente
);
