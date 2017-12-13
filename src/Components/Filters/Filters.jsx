import React, { Component } from 'react';
import Select from '../Select';
import s from './Filters.css';

Array.prototype.clean = function (deleteValue) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === deleteValue) {
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

  isFilterWorthIt(column, value) {
    // Get the data from the attribute
    const { filter } = this.state;
    const { data } = this.props;

    // Loop through the data
    const people = data.map((item, key) => {
        const { nombres } = item;

        for (let i = 0; i < filter.length; i += 1) {
          const filterItem = filter[i];
          if (filterItem.which === null) continue;
          if (item[filterItem.column] !== filterItem.which) return;
        }

        if (item[column] !== value) return;

        return nombres;
      }
    );
    return people.clean(undefined).length;
  }

  generateOptions(column) {
    const { data } = this.props;

    const array = [];
    const items = data.map((item) => {
      if (item[column] === '') return;

      for (let i = 0; i < array.length; i += 1) {
        if (array[i] === item[column]) return;
      }

      // if (!this.isFilterWorthIt(column, item[column])) return;

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
    const {items} = this.props;
    return items.map((item) => {
      return (
        <Select
          key={item.title}
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