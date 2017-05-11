import React, { Component } from 'react';
import { Link } from 'react-router';
import GoogleMapContainer from '../containers/GoogleMapContainer';


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

    let eventEndedclassName;
    if (this.props.eventEnded == false){
      eventEndedclassName = 'show';
    } else {
      eventEndedclassName = 'hidden';
    }

    let eventWinnerclassName;
    if (this.props.eventEnded == true){
      eventWinnerclassName = 'show';
    } else {
      eventWinnerclassName = 'hidden';
    }


   return(
     <div className="event-show-tile">
       <div className='show-box-content'>
       <Link to='/events'>
       <button type='button' className="button" id='back-button'>Back to Events</button>
       </Link>
       <br/>
       <br/>
       <br/>

       <div className={eventWinnerclassName}>
        <h3>This event is closed.</h3>
        <p>Location: </p>
        <p>Date & Time: </p>
        <GoogleMapContainer />
       </div>

         <h3 className='event-title'>{this.props.name}</h3>
         <p>{this.props.description}</p>
         <p>Cutoff time: {this.props.cutoff_time}</p>
         <p>People invited: {this.state.invitee_emails}</p>
       </div>
       <div className={eventEndedclassName}>
       <center><div className="row event-show-buttons-row">
          <a href={`/events/${this.props.id}/edit`} onClick={this.props.handleUpdate} className={className} id='edit-event-show-button'>Edit</a>
          <Link to='/'>
          <button type='button' className={className} onClick={this.props.handleDelete} id='delete-button'>Delete</button>
          </Link>
          <a href={`/events/${this.props.id}/invite`} className={className} id='invite-show-button'>Invite Friends</a>
      </div></center>
      </div>
    </div>
   )
 }
}

export default EventShowTile;
