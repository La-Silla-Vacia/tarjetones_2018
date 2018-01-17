import React, { Component } from 'react';

import s from './Select.css';

const Option = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className={s.option}
  >
    {children}
  </button>
);

export default Option;