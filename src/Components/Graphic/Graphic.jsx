import React, { Component } from 'react';
import cN from 'classnames';
import Select from '../Select';
import s from './Graphic.css';

export default class Graphic extends Component {
  getCircles() {
    // Get the data from the attribute
    const { data } = this.props;
    console.log(data);

    // Loop through the data
    return data.map((item, key) => {
        const { nombres, apellido1, apellido2, camara, partido, foto } = item;

        const photo = (foto) ? foto : 'http://archivo.lasillavacia.com/archivos/historias/odebrecht/15.jpg';

        // Return the element. If you click on it run the handleClick function
        return (
          <div className={s.person} key={key}>
            <div className={s.name}>
              <img className={s.photo} src={photo} alt='' />
              {nombres} {apellido1} {apellido2}
            </div>
            <div className={s.camara}>{camara}</div>
            <div className={s.partido}>{partido}</div>
          </div>
        )
      }
    );
  }

  render() {
    const circles = this.getCircles();

    return (
      <div className={s.root}>

        <Select />

        <header className={cN(s.person, s.heading)}>
          <div className={s.extraIndent}><span>Nombre</span></div>
          <div><span>Cámara</span></div>
          <div><span>Partido</span></div>
        </header>
        {circles}
      </div>
    )
  }
}