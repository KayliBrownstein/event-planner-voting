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
      <div className='column row small-12 medium-12 large-12 columns'>
        <div className='all-events'>
          {events}
        </div>
      </div>
    )
  }
}

export default AllEvents;
