import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import NewEventContainer from './containers/NewEventContainer';

$(function() {
  if (document.getElementById('app')) {
    ReactDOM.render(
      <Root />,
      document.getElementById('app')
    );
  };
  if (document.getElementById('new')) {
    ReactDOM.render(
      <NewEventContainer />,
      document.getElementById('new')
    );
    };
});
