import React, { Component } from 'react';
import cN from 'classnames';
import Select from '../Select';
import s from './Filters.css';

Array.prototype.clean = function (deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

export default class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: []
    }
  }

  handleFilterChange(column, a) {
    const { filter } = this.state;
    const { onFilterUpdate } = this.props;
    let found = false;
    for (let i = 0; i < filter.length; i += 1) {
      const filterItem = filter[i];
      if (filterItem.column === column) {
        found = true;
        filterItem.which = a;
      }
    }

    if (!found) {
      filter.push({
        column: column,
        which: a
      })
    }

    if (onFilterUpdate) onFilterUpdate(filter);
  }

  generateOptions(column) {
    console.log('generating');
    const { data } = this.props;

    const array = [];
    const items = data.map((item) => {
      if (item[column] === '') return;

      for (let i = 0; i < array.length; i += 1) {
        if (array[i] === item[column]) return;
      }

      array.push(item[column]);
      return {
        label: item[column],
        value: item[column]
      };
    });

    items.unshift({ label: "Todos", value: null });
    return items.clean(undefined);
  }

  getSelects() {
    const which = [
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
    ];
    return which.map((item) => {
      return (
        <Select
          title={item.title}
          options={this.generateOptions(item.column)}
          callback={this.handleFilterChange.bind(this, item.column)}
        />
      );
    });
  }

  render() {
    const selects = this.getSelects();
    return (
      <div className={s.root}>


        {selects}
      </div>
    )
  }
}