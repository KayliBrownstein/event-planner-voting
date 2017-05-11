import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import 'whatwg-fetch';

$(function() {
  if (document.getElementById('app')) {
    ReactDOM.render(
      <Root />,
      document.getElementById('app')
    );
  };
});
