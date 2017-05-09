import React, { Component } from 'react';
import { Link } from 'react-router';
import AllEvents from '../components/AllEvents';

class NavContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      query: '',
      filtered_data: [],
      user_id: ''
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    fetch(`/api/v1/users.json`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          user_id: responseData.current_user.id
        });
    });
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
      <div id='progress'>
      <div className="sticky-container" data-sticky-container>
        <div className="sticky" id="nav-bar" data-sticky data-top-anchor='progress' data-bottom-anchor='footer' data-margin-top="0">
          <div className="flex-container align-right align-bottom" id="nav-bar">
            <div className="menu">
              <ul className="menu">
                <li id="short-logo"><Link to="/events">SYW</Link></li>
                <li id="logo"><Link to="/events">SeeYouWhen</Link></li>
                <li>
                  <div className="search-wrapper">
                    <form>
                      <input className="search-input" name='query' type="text" placeholder="Search Events" onChange={this.handleSearchTermChange} value={this.state.query}/><i className="fa fa-search" id='search' aria-hidden="true"></i>
                    </form>
                  </div>
                </li>
                <ul className='profile-dropdown-menu' data-dropdown-menu>
                  <li>
                    <Link to="/users"><i className="fa fa-user fa-fw" id='profile'></i>My Profile</Link>
                    <ul className="user-profile-functions menu">
                      <li><a href={`/users/${this.state.user_id}/edit`}><i className="fa fa-pencil-square-o" aria-hidden="true"></i>Edit My Profile</a></li>
                      <li><a href='/logout'><i className="fa fa-sign-out" aria-hidden="true"></i>Log Out</a></li>
                    </ul>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
        </div>
        <div className='search-results'>
          <AllEvents
            events = {this.state.filtered_data}
          />
        </div>
        {this.props.children}
      <div className='footer'>
      </div>
      </div>

    )
  }
}

export default NavContainer;
