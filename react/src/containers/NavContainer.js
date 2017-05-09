import React, { Component } from 'react';
import { Link } from 'react-router';
import AllEvents from '../components/AllEvents';

class NavContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      filtered_data: []
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  getSearchResults(){
    let query= { query: this.state.query }
    fetch(`/api/v1/searches`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query)
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ filtered_data: responseData });
    });
  }

  handleSearchTermChange(event){
    this.setState({ query: event.target.value });
    this.getSearchResults();
  }

  render() {
    return(
      <div>
        <div className="row" id="nav-bar">
          <div className="small-12 large-12 columns" id="nav-bar">
            <div className="menu">
              <ul className="menu align-right">
                <li><Link to="/users"><i className="fa fa-user fa-fw" id='profile'></i>My Profile</Link></li>
                <li>
                  <div className="search-wrapper">
                    <form>
                      <input className="search-input" name='query' type="text" placeholder="Search Events" onChange={this.handleSearchTermChange} value={this.state.query}/><i className="fa fa-search" id='search' aria-hidden="true"></i>
                    </form>
                  </div>
                </li>
                <li id="short-logo"><Link to="/events">SYW</Link></li>
                <li id="logo"><Link to="/events">SeeYouWhen</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className='search-results'>
          <AllEvents
            events = {this.state.filtered_data}
          />
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default NavContainer;
