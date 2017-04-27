import React from 'react';
import { Link } from 'react-router';

const EventTile = (props) => {
  return(
    <div>
      <h3><Link to={`/events/${props.id}`}>{props.name}</Link></h3>
      <p>{props.description}</p>
    </div>
  )
}

export default EventTile;
