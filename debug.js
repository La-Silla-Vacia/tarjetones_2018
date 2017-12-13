/*global require,console*/
var lsv = require('lsv-interactive');
import React from 'react';
import ReactDOM from 'react-dom';
import Base from './src/base.jsx';

require("./src/base.css"); // this goes outside the callback since otherwise the interactive sometimes fires before the CSS is fully loaded
require("./src/global.css");

lsv("tarjetones_2018", function (interactive) {
  "use strict";

  if (!interactive) {
    console.log("Interactive tarjetones_2018 not initiated. Exiting.");
    return;
  }

  ReactDOM.render( <Base {...interactive} />, interactive.el);

}, true); // change this last param to true if you want to skip the DOM checks