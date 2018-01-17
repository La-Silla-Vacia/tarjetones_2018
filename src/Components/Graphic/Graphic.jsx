import React, { Component } from 'react';
import Filters from '../../../../elections_2018/shared/Components/Filters';
import s from './Graphic.css';
import Row from "../Row";

export default class Graphic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: [],
      nameFilter: '',
      show: 9,
      availableItems: 0,
      items: []
    }
  }

  componentDidMount() {
    this.filterItems(this.state.filter);
  }

  getPeople() {
    // Get the data from the attribute
    const { items, show } = this.state;

    // Loop through the data
    let i = 0;
    return items.map((item, key) => {
        i += 1;
        if (i > show) return;

        // Return the element. If you click on it run the handleClick function
        return (
          <Row key={key} {...item} />
        )
      }
    );
  }

  filterItems(filter) {
    const { data } = this.props;

    const items = data.map((item) => {

      for (let j = 0; j < filter.length; j += 1) {
        const filterItem = filter[j];
        if (!filterItem) continue;
        if (filterItem.which === null) continue;
        if (item[filterItem.column] !== filterItem.which) return;
      }

      const customFilters = tarjetones_2018_data.filters;
      if (typeof customFilters) {
        for (let j = 0; j < customFilters.length; j += 1) {
          const filterItem = customFilters[j];
          if (!filterItem) continue;
          if (!filterItem.hasOwnProperty("only")) continue;

          if (typeof filterItem.only === 'object') {
            if (filterItem.only.indexOf(item[filterItem.column]) === -1) return;
          } else {
            if (item[filterItem.column] !== filterItem.only) return;
          }
        }
      }
      return item;
    });

    this.setState({ items: items.clean(undefined), filter, availableItems: items.clean(undefined).length });
  }

  handleFilterUpdate = newFilters => {
    this.filterItems(newFilters);
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
    const { availableItems, show } = this.state;
    const { data } = this.props;
    const people = this.getPeople();
    return (
      <div className={s.root}>
        <Filters
          data={data}
          grid={true}
          filter={this.state.filter}
          onFilterUpdate={this.handleFilterUpdate}
          onNameUpdate={this.handleNameUpdate}
        />
        {(!people.length) ?
          <em>Sus opciones de filtro no dan resultado. Por favor cámbialos.</em>
          : false}
        <div className={s.items}>
          {people}
        </div>

        {(show <= availableItems) ?
          <button className={s.showMore} onClick={this.handleShowMore}>Mostrar más</button>
          : false}
      </div>
    )
  }
}