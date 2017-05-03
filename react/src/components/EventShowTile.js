import React, { Component } from 'react';
import { Link } from 'react-router';

class EventShowTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      event_id: [],
      current_user: ''
    }
  }

  componentDidMount(){
    this.getUserData();
  }

  getUserData(){
    fetch(`/api/v1/users`, {credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        current_user: responseData.current_user
      });
    });
  }

  render(){
    let deleteClassName;
    if (this.state.current_user.id == this.props.id){
      deleteClassName = "show"
    } else {
      deleteClassName = "hidden"
    }
   return(
     <div className="small-12 medium-12 large-12 large-centered columns event-show-tile">
       <div className='show-box-content'>
         <h3 className='event-title'>{this.props.name}</h3>
         <p>{this.props.description}</p>
       </div>
       <div className="row">
          <a href={`/events/${this.props.id}/edit`} onClick={this.props.handleUpdate} className={deleteClassName} id='edit-button'>Edit</a>
          <Link to='/'>
          <button type='button' className={deleteClassName} onClick={this.props.handleDelete} id='delete-button'>Delete</button>
          </Link>
        </div>
     </div>
   )
 }
}

export default EventShowTile;
