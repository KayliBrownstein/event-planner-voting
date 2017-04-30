import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import NavContainer from './containers/NavContainer';
import IndexContainer from './containers/IndexContainer';
import EventShowContainer from './containers/EventShowContainer';
import NewEventContainer from './containers/NewEventContainer';


const Root = (props, state, params) => {
  return(
      <Router history={browserHistory}>
        <Route path="/" component={NavContainer}>
          <IndexRoute component={IndexContainer}/>
          <Route path='events' component={IndexContainer} />
          <Route path='events/new' component={NewEventContainer} />
          <Route path='events/:id' component={EventShowContainer} />
        </Route>
      </Router>
    )
  }

export default Root;
