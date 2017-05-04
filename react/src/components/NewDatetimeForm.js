import React from 'react';

const NewDatetimeForm = props => {
 return(
   <div className="column row submit-location">
     <div className= 'new-datetime-button large-12 columns'>
       <button type="button" onClick={props.handleDatetimeFormButtonClick} className= 'button create-datetime'>Add a Date and Time</button>
     </div>
     <form onSubmit={props.handleSubmit} className={props.className} id="new-datetime">
       <label> Date: </label>
       <input name="date" type="text" onChange={props.dateChange} value={props.dateValue}/>

       <label> Time: </label>
       <textarea name="time" onChange={props.timeChange} value={props.timeValue}/>

       <input className= 'create-datetime-submit' type="submit" value="Submit"/>
     </form>
   </div>
 )
}

export default NewDatetimeForm;
