import React, { Component } from 'react';
import { Link } from 'react-router';

class EventShowTile extends Component {
  constructor(props){
    super(props);
    this.state = {
      current_user: '',
      invitee_emails: ''
    }
  }

  componentDidMount(){
    this.getUserData();
    this.getAttendees();
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

  getAttendees(){
    fetch(`/api/v1/events/${this.props.eventId}`, {credentials: 'same-origin' })
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        invitee_emails: responseData.invitee_emails
      });
    });
  }

  render(){
    let className;
    if (this.state.current_user.id == this.props.user_id){
      className = 'show';
    } else {
      className = 'hidden';
    }

   return(
     <div className="event-show-tile">
       <div className='show-box-content'>
       <Link to='/events'>
       <button type='button' className="button" id='back-button'>Back to Events</button>
       </Link>
       <br/>
         <h3 className='event-title'>{this.props.name}</h3>
         <p>{this.props.description}</p>
         <p>Cutoff time: {this.props.cutoff_time}</p>
         <p>People invited: {this.state.invitee_emails}</p>
       </div>
       <center><div className="row event-show-buttons-row">
          <a href={`/events/${this.props.id}/edit`} onClick={this.props.handleUpdate} className={className} id='edit-button'>Edit</a>
          <Link to='/'>
          <button type='button' className={className} onClick={this.props.handleDelete} id='delete-button'>Delete</button>
          </Link>
          <a href={`/events/${this.props.id}/invite`} className={className} id='invite-button'>Invite Friends</a>
      </div></center>
    </div>
   )
 }
}

export default EventShowTile;
