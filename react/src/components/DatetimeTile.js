import React from 'react';

const DatetimeTile = (props) => {
  return(
    <div className="small-12 medium-5 large-3 columns datetime-tile">
      <div className='datetime-box-content'>
        <p>{props.date}</p>
        <p>{props.time}</p>
      </div>
    </div>
  )
}

export default DatetimeTile;
