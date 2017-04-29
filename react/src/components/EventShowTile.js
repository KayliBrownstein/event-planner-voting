import React from 'react';

const EventShowTile = (props) => {
  return(
    <div className="small-12 medium-12 large-12 large-centered columns event-show-tile">
      <div className='show-box-content'>
        <h3 className='event-title'>{props.name}</h3>
        <p>{props.description}</p>
      </div>
    </div>
  )
}

export default EventShowTile;
