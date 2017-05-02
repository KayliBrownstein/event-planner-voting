import React, { Component } from 'react';
import { Link } from 'react-router';

class NavContainer extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
      <div>
        <div className="row" id="nav-bar">
          <div className="small-12 large-12 columns" id="nav-bar">
            <div className="menu">
              <ul className="menu align-right">
                <li><Link to="/users">My Profile</Link></li>
                <li><a href="#">Search</a></li>
                <li id="logo"><Link to="/">EVENT</Link></li>
              </ul>
            </div>
          </div>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default NavContainer;
