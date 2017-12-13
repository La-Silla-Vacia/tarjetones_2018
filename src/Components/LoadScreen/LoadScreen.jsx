import React, { Component } from 'react';

const LoadScreen = ({ children, ...props }) => (
  <img src="https://raw.githubusercontent.com/la-silla-vacia/lsv-interactive/master/misc/lsvi-loading.gif"
       alt="Interactive is loading" style={{
    width: '100%',
    maxWidth: 320 + 'px',
    margin: '4em auto',
    display: 'block'
  }} />
);

export default LoadScreen;