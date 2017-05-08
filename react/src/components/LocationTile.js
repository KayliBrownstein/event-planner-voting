import React from 'react';

const LocationTile = (props) => {
  return(
    <div className="small-12 medium-5 large-3 columns location-tile">
      <div className='location-box-content'>
        <h3 className='location-title'>{props.name}</h3>
        <center><span><button className="button thumbs-down-button" onClick={props.downvoteHandler}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button></span><span className="vote-count">{props.votes}</span><span><button className="button thumbs-up-button" onClick={props.upvoteHandler}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button></span></center>
        <p>{props.description}</p>
        <p>{props.address}</p>
        <p>{props.city}, {props.state}</p>
      </div>
    </div>
  )
}

export default LocationTile;
