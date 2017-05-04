import React from 'react';

const DatetimeTile = (props) => {
  return(
    <div className="small-12 medium-5 large-3 columns datetime-tile">
      <div className='datetime-box-content'>
      <span><button className="button thumbs-down-button" onClick={props.downvoteHandler}><i className="fa fa-thumbs-down" aria-hidden="true"></i></button></span><span className="vote-count">{props.votes}</span><span><button className="button thumbs-up-button" onClick={props.upvoteHandler}><i className="fa fa-thumbs-up" aria-hidden="true"></i></button></span>
        <p>{props.date}</p>
        <p>{props.time}</p>
      </div>
    </div>
  )
}

export default DatetimeTile;
