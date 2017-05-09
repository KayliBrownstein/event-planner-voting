import React from 'react';

const DatetimeTile = (props) => {
  return(
    <div className="small-12 medium-6 large-4 columns location-tile">
      <div className='datetime-box-content'>
      <center><span><button className="button thumbs-down-button" onClick={props.downvoteHandler}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button></span><span className="vote-count">{props.votes}</span><span><button className="button thumbs-up-button" onClick={props.upvoteHandler}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button></span></center>
        <h4>{props.date}</h4>
        <h4>{props.time}</h4>
      </div>
    </div>
  )
}

export default DatetimeTile;
