import React, { Component } from 'react';
import cN from 'classnames';
import Filters from '../Filters';
import r from '../Row/Row.css';
import s from './Graphic.css';
import Row from "../Row";

export default class Graphic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      nameFilter: '',
      show: 11
    }
  }

  getPeople() {
    // Get the data from the attribute
    const { filter, nameFilter, show } = this.state;
    const { data } = this.props;

    // Loop through the data
    let i = 0;
    return data.map((item, key) => {
        if (nameFilter) {
          const name = `${item.nombres} ${item.apellido1} ${item.apellido2}`;
          if (!name.toLowerCase().includes(nameFilter.toLowerCase())) return;
        } else {
          for (let j = 0; j < filter.length; j += 1) {
            const filterItem = filter[i];
            if (filterItem.which === null) continue;
            if (item[filterItem.column] !== filterItem.which) return;
          }
        }

        if (i > show) return;
        i += 1;

        // Return the element. If you click on it run the handleClick function
        return (
          <Row key={key} {...item} />
        )
      }
    );
  }

  handleFilterUpdate = newFilters => {
    this.setState({ filter: newFilters });
  };

  handleNameUpdate = newName => {
    this.setState({ nameFilter: newName });
  };

  handleShowMore = () => {
    const { show } = this.state;
    if (show < this.props.data.length) {
      this.setState({ show: show + 15 });
    }
  };

  render() {
    const { show } = this.state;
    const { data } = this.props;
    const people = this.getPeople();

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
          onNameUpdate={this.handleNameUpdate}
        />

        {/*<header className={cN(r.root, s.heading)}>*/}
          {/*<div className={s.extraIndent}><span>Nombre</span></div>*/}
          {/*<div><span>Cámara</span></div>*/}
          {/*<div><span>Partido</span></div>*/}
        {/*</header>*/}

        <div className={s.items}>
          {people}
        </div>

        <button className={s.showMore} onClick={this.handleShowMore}>Mostrar más</button>
      </div>
    )
  }
}