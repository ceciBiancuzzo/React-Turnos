import React, { Component } from 'react';

class Encabezado extends Component {
  render() {
    return (
      <nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
        <a className='navbar-brand col-sm-3 col-md-2 mr-0' href='/'>
          Gimnasio CORPORE FIT
        </a>
        <ul className='navbar-nav px-3'>
          <li className='nav-item text-nowrap'>
            <a className='nav-link' href='/'>
              Salir
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Encabezado;
