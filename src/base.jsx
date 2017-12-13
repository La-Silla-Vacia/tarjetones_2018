import { h, render, Component } from 'preact';
import cn from 'classnames';

import getData from './Scripts/getData';
import LoadScreen from './Components/LoadScreen';
import Graphic from './Components/Graphic';

import s from './base.css';

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      loading: true
    };

    this.setData = this.setData.bind(this);
  }

  setData(data) {
    this.setState({ data: data, loading: false });
  }

  componentWillMount() {
    getData(this.setData);
  }

  render(props, state) {
    const { loading, data } = state;

    // If it's still downloading the data, show the loadscreen
    let content = (loading) ? (<LoadScreen />) : (
      <div className={s.inner}>
        <Graphic data={data} />
      </div>
    );

    return(
      <div className={cn(s.container, {[s.loading]: loading})}>
        { content }
      </div>
    )
  }
}