import React, { Component } from 'react';
import EventTile from './EventTile';

class AllEvents extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    let events = this.props.events.map((event) => {
      return(
        <EventTile
          key={event.id}
          id={event.id}
          name={event.name}
          description={event.description}
          cutoff_time={event.cutoff_time}
        />
      )
    })

    return(
      <div>
        {events}
      </div>
    )
  }
}

export default AllEvents;
