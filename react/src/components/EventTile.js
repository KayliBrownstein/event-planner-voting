import React from 'react';
import { Link } from 'react-router';

const EventTile = (props) => {
  return(
    <div className="small-12 medium-6 large-4 columns event-tile">
      <div className='box-content'>
        <Link to={`/events/${props.id}`}><h3 className='event-title'>{props.name}</h3></Link>
        <h6>{props.description}</h6>
      </div>
    </div>
  )
}

export default EventTile;
