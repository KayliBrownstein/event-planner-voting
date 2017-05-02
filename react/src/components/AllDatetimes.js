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

  // getLocationData(){
  //   let eventId = this.props.id;
  //   fetch(`/api/v1/events/${eventId}/locations`)
  //     .then(response => response.json())
  //     .then(responseData => {
  //       this.setState({ locations: responseData })
  //     });
  // }

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
      return (
        <DatetimeTile
          key = {datetime.id}
          id = {datetime.id}
          date = {datetime.date}
          time = {datetime.time}
          user_id = {datetime.user_id}
          event_id = {datetime.event_id}
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
