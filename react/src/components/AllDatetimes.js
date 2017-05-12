import React, { Component } from 'react';
import DatetimeTile from './DatetimeTile';
import NewDatetimeForm from './NewDatetimeForm';

class AllDatetimes extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){

    let datetimes = this.props.datetimes.map((datetime) => {
      return (
        <DatetimeTile
          key = {datetime.id}
          id = {datetime.id}
          date = {datetime.date}
          time = {datetime.time}
          user_id = {datetime.user_id}
          event_id = {datetime.event_id}
          voteCount = {datetime.vote_count}
          eventEnded = {this.props.eventEnded}
        />
      )
    })

    let eventEndedclassName;
    if (this.props.eventEnded == false){
      eventEndedclassName = 'show';
    } else {
      eventEndedclassName = 'hidden';
    }

    return(
      <div className='column row centered'>
      <br />
      <div className={eventEndedclassName}>
      <NewDatetimeForm
      className = {this.props.className}
      handleDatetimeFormButtonClick = {this.props.handleDatetimeFormButtonClick}
      dateValue = {this.props.date}
      timeValue = {this.props.time}

      dateChange = {this.props.handleDateChange}
      timeChange = {this.props.handleTimeChange}

      handleDatetimeSubmit = {this.props.handleDatetimeSubmit}
      />
      </div>
      <h1 className='datetimes-title'>Dates and Times</h1>
      {datetimes}
      </div>
    )
  }
}

export default AllDatetimes;
