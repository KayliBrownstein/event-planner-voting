import React from 'react';

const NewDatetimeForm = props => {
 return(
   <div className="column row submit-location">
     <div className= 'new-datetime-button large-12 columns'>
       <center><button type="button" onClick={props.handleDatetimeFormButtonClick} className= 'button create-datetime'>Add a Date and Time</button></center>
     </div>
     <form onSubmit={props.handleDatetimeSubmit} className={props.className} id="new-datetime">
       <label> Date: </label>
       <input name="date" type="date" onChange={props.dateChange} value={props.dateValue}/>

       <label> Time: </label>
       <input name="time" type="time" onChange={props.timeChange} value={props.timeValue}/>

       <input className='button submit-button' type="submit" value="Submit"/>
     </form>
   </div>
 )
}

export default NewDatetimeForm;
