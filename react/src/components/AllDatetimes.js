import React, { Component } from 'react';
import DatetimeTile from './DatetimeTile';
import NewDatetimeForm from './NewDatetimeForm';

class AllDatetimes extends Component {
  constructor(props){
    super(props);
    this.state = {
      datetimes: [],
      formToggle: false,
      date: '',
      time: ''
    };
    this.handleDatetimeFormButtonClick = this.handleDatetimeFormButtonClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.updateDatetimeVote = this.updateDatetimeVote.bind(this);
  }

  updateDatetimeVote(datetime_id, upvote){
    let votePayload = {
      datetime_vote: {
        upvote: upvote
      }
    }
    let eventId = this.props.id;
    let datetimeId = datetime_id;

    fetch(`/api/v1/events/${eventId}/datetimes/${datetimeId}`, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(votePayload)
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        locations: body.locations,
      });
      this.getDatetimeVote(datetime_id);
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event){
    event.preventDefault();
    let datetimePayload = {
      date: this.state.date,
      time: this.state.time
    }
    this.sendInput(datetimePayload);
  }

  sendInput(datetimePayload){
    let eventId = this.props.id;
    fetch(`/api/v1/events/${eventId}/datetimes`, {
      credentials: 'same-origin',
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datetimePayload)
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ datetimes: [...this.state.datetimes, responseData] });
    });
  }

  getDatetimeVote(datetime_id){
    let eventId = this.props.id;
    let datetimeId = datetime_id;

    fetch(`/api/v1/events/${eventId}/datetimes/${datetimeId}`, {
      credentials: 'same-origin',
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ votes: responseData.datetime_votes })
    })
  }

  handleDatetimeFormButtonClick(){
    if (this.state.formToggle == false) {
      this.setState({
        formToggle: true,
      })
    } else {
      this.setState({
        formToggle: false,
      })
    }
  }

  handleDateChange(event){
    this.setState({ date: event.target.value })
  }

  handleTimeChange(event){
    this.setState({ time: event.target.value })
  }

  render(){
    let className;
    if (this.state.formToggle) {
      className = 'selected'
    } else {
      className = 'hidden'
    };

    let datetimes = this.props.datetimes.map((datetime) => {
      let upvoteHandler = () => {
        this.updateDatetimeVote(datetime.id, true)
      }
      let downvoteHandler = () => {
        this.updateDatetimeVote(datetime.id, false)
      }
      return (
        <DatetimeTile
          key = {datetime.id}
          id = {datetime.id}
          date = {datetime.date}
          time = {datetime.time}
          user_id = {datetime.user_id}
          event_id = {datetime.event_id}
          votes = {datetime.vote_count}
          upvoteHandler = {upvoteHandler}
          downvoteHandler = {downvoteHandler}
        />
      )
    })

    return(
      <div>
        {datetimes}
        <NewDatetimeForm
          className = {className}
          handleDatetimeFormButtonClick = {this.handleDatetimeFormButtonClick}
          dateValue = {this.state.date}
          timeValue = {this.state.time}

          dateChange = {this.handleDateChange}
          timeChange = {this.handleTimeChange}

          handleSubmit = {this.handleSubmit}
        />
      </div>
    )
  }
}

export default AllDatetimes;
