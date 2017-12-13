import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cN from 'classnames';
import s from './Select.css';

export default class Select extends Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {
    title: 'No title given'
  };

  render() {
    const { title } = this.props;

    return (
      <div className={s.root}>
        <div className={s.title}>{title}</div>
      </div>
    )
  }
}