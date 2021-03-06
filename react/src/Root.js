import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import NavContainer from './containers/NavContainer';
import IndexContainer from './containers/IndexContainer';
import EventShowContainer from './containers/EventShowContainer';
import ProfileContainer from './containers/ProfileContainer';

const Root = (props, state, params) => {
  return(
      <Router history={browserHistory}>
        <Route path="/" component={NavContainer}>
          <IndexRoute component={IndexContainer}/>
          <Route path='events' component={IndexContainer} />
          <Route path='events/:id' component={EventShowContainer} />
          <Route path='events/:id/invite' component={EventShowContainer} />
          <Route path='events/:id/edit' component={EventShowContainer} />
          <Route path='users' component={ProfileContainer} />
          <Route path='users/:id' component={ProfileContainer} />
          <Route path='users/:id/edit' component={ProfileContainer} />
        </Route>
      </Router>
    )
  }

export default Root;
