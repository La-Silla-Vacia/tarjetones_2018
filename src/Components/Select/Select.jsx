import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cN from 'classnames';
import s from './Select.css';

import Option from './Option.jsx';

export default class Select extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {
    title: 'No title given'
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      selected: 0
    }
  }

  handleClick = (i) => {
    const { selected } = this.state;
    const { callback, options } = this.props;
    this.setState({ open: !this.state.open, selected: i });
    if (selected !== i && callback) callback(options[i].value);
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;
    const { title, options } = this.props;

    return (
      <div className={s.root}>
        <div className={s.box}>
          <button className={cN(s.toggle, s.option, { [s.open]: open })} onClick={this.toggle}>
            <div className={s.title}>{title}</div>
            <div className={cN(s.arrow, { [s.arrowOpen]: open })} />
          </button>
          <div className={cN(s.options, { [s.open]: open })}>
            {options.map((item, i) => {
              if (open) {
                return (
                  <Option onClick={this.handleClick.bind(this, i)} key={i}>
                    {item.label}
                  </Option>
                );
              }
            })}
          </div>
        </div>
      </div>
    )
  }
}