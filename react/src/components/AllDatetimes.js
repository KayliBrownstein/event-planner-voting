import React, { Component } from 'react';
import DatetimeTile from './DatetimeTile';

class AllDatetimes extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    let datetimes = this.props.datetimes.map((datetime) => {
      return (
        <DatetimeTile
          key = {location.id}
          id = {location.id}
          date = {location.date}
          time = {location.time}
          user_id = {location.user_id}
          event_id = {location.event_id}
        />
      )
    })

    return(
      <div>
        {datetimes}
      </div>
    )
  }
}

export default AllDatetimes;
