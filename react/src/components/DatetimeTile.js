import React from 'react';

const DatetimeTile = (props) => {
  return(
    <div className="small-12 medium-6 large-4 columns datetime-tile">
      <div className='box-content'>
        <p>{props.date}</p>
        <p>{props.time}</p>
      </div>
    </div>
  )
}

export default DatetimeTile;
