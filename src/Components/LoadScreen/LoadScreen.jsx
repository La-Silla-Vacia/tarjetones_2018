import { h, render, Component } from 'preact';

const LoadScreen = ({ children, ...props }) => (
  <img src="https://raw.githubusercontent.com/la-silla-vacia/lsv-interactive/master/misc/lsvi-loading.gif"
       alt="Interactive is loading" style="width:100%;max-width: 320px;margin: 4em auto;display: block;" />
);

export default LoadScreen;