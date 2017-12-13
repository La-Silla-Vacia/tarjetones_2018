import React, { Component } from 'react';
import s from './Row.css';

export default class Row extends Component {
  render() {
    const {nombres, apellido1, apellido2, camara, partido, foto} = this.props;
    const photo = (foto) ? foto : 'http://archivo.lasillavacia.com/archivos/historias/odebrecht/15.jpg';
    return (
      <div className={s.root}>
        <div className={s.name}>
          <img className={s.photo} src={photo} alt='' />
          {nombres} {apellido1} {apellido2}
        </div>
        <div className={s.camara}>{camara}</div>
        <div className={s.partido}>{partido}</div>
      </div>
    );
  }
}