import React, { Component } from 'react';
import cN from 'classnames';
import Filters from '../Filters';
import s from './Graphic.css';

export default class Graphic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: []
    }
  }

  getCircles() {
    // Get the data from the attribute
    const { filter } = this.state;
    const { data } = this.props;

    // Loop through the data
    return data.map((item, key) => {
        const { nombres, apellido1, apellido2, camara, partido, foto } = item;

        const photo = (foto) ? foto : 'http://archivo.lasillavacia.com/archivos/historias/odebrecht/15.jpg';

        for (let i = 0; i < filter.length; i += 1) {
          const filterItem = filter[i];
          if (filterItem.which === null) continue;
          if (item[filterItem.column] !== filterItem.which) return;
        }

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

  handleFilterUpdate = newFilters => {
    this.setState({ filter: newFilters });
  };

  render() {
    const { data } = this.props;
    const circles = this.getCircles();
    return (
      <div className={s.root}>

        <Filters
          data={data}
          items={[
            {
              title: "Género",
              column: 'genero'
            },
            {
              title: 'Profesión u oficio',
              column: 'profesionUOficio'
            },
            {
              title: 'Nivel de estudios',
              column: 'nivelDeEstudios'
            },
            {
              title: 'Sector del que viene',
              column: 'sectorDelQueViene'
            },
            {
              title: 'Experto en',
              column: 'expertoEn'
            },
            {
              title: 'Ha sido congresista',
              column: 'haSidoCongresista'
            }
          ]}
          onFilterUpdate={this.handleFilterUpdate}
        />

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