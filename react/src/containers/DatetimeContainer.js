import React, { Component } from 'react';
import AllDatetimes from '../components/AllDatetimes';

class DatetimeContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: '',
      time: '',
      datetimeformToggle: false,
      datetimes: []
    }
    this.handleDatetimeFormButtonClick = this.handleDatetimeFormButtonClick.bind(this);
    this.handleDatetimeSubmit = this.handleDatetimeSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount(){
    this.getDatetimeData();
  }

  getDatetimeData(){
    let eventId = this.props.eventId
    fetch(`/api/v1/events/${eventId}/datetimes`, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseData => {
      this.setState({ datetimes: responseData })
    })
  }

  handleDatetimeFormButtonClick(){
    if (this.state.datetimeformToggle == false) {
      this.setState({
        datetimeformToggle: true
      })
    } else {
      this.setState({
        datetimeformToggle: false
      })
    }
  }

  handleDateChange(event){
    this.setState({ date: event.target.value });
  }

  handleTimeChange(event){
    this.setState({ time: event.target.value });
  }

  handleDatetimeSubmit(event){
    event.preventDefault();
    let datetimePayload = {
      date: this.state.date,
      time: this.state.time
    };
    this.sendDatetimeInput(datetimePayload);
  }

  sendDatetimeInput(datetimePayload){
    let eventId = this.props.eventId;
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
  render(){
    let datetimeclassName;
    if (this.state.datetimeformToggle) {
      datetimeclassName = 'selected'
    } else {
      datetimeclassName = 'hidden'
    };

    return(
      <AllDatetimes
        datetimes={this.state.datetimes}
        id={this.props.id}
        date={this.state.date}
        time={this.state.time}
        className={datetimeclassName}

        handleDatetimeSubmit = {this.handleDatetimeSubmit}
        handleDateChange = {this.handleDateChange}
        handleTimeChange = {this.handleTimeChange}
        handleDatetimeFormButtonClick = {this.handleDatetimeFormButtonClick}
      />
    )
  }
}

export default DatetimeContainer;
