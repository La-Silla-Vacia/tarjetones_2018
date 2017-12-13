import React, { Component } from 'react';
import s from './Row.css';

export default class Row extends Component {
  render() {
    const { nombres, apellido1, apellido2, camara, partido, foto, twitter, perfilDeQuienEsQuien } = this.props;
    const photo = (foto) ? foto : 'http://archivo.lasillavacia.com/archivos/historias/odebrecht/15.jpg';
    return (
      <div className={s.root}>
        <img className={s.photo} src={photo} alt='' />
        <div className={s.inner}>
          <div className={s.name}>
            {nombres} {apellido1} {apellido2}
          </div>
          <div className={s.social}>
            {(twitter) ?
              <a href={`https://twitter.com/${twitter}`} target='_blank' rel={'noreferer'}>{twitter}</a>
              : false}
            {(twitter && perfilDeQuienEsQuien) ? ' - ' : false}
            {(perfilDeQuienEsQuien) ?
              <a href={perfilDeQuienEsQuien}>Quien es quien</a>
              : false}
          </div>
          <footer className={s.footer}>
            <div className={s.camara}>
              <div className={s.headline}>Cámara</div>
              {camara}
            </div>
            <div className={s.partido}>
              <div className={s.headline}>Partido</div>
              {partido}
            </div>
          </footer>
        </div>
      </div>
    );
  }
}