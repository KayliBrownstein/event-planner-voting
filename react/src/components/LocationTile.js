import React from 'react';

const LocationTile = (props) => {
  return(
    <div className="small-12 medium-5 large-3 columns location-tile">
      <div className='location-box-content'>
        <h3 className='location-title'>{props.name}</h3>
        <p>{props.description}</p>
        <p>{props.address}</p>
        <p>{props.city}</p>
        <p>{props.state}</p>
      </div>
    </div>
  )
}

export default LocationTile;
