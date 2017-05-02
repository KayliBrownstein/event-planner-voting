import React from 'react';

const NewEventForm = props => {
 return(
   <div className="column row submit-event">
     <div className= 'new-event-button large-12 columns'>
       <center> <button type="button" onClick={props.handleFormButtonClick} className= 'create-event'>Create an Event</button> </center>
     </div>
     <form onSubmit={props.handleSubmit} className={props.className} id="new-site">
       <label> Name: </label>
       <input name="name" type="text" onChange={props.nameChange} value={props.nameValue}/>

       <label> Description: </label>
       <textarea name="description" onChange={props.descriptionChange} value={props.descriptionValue}/>

       <label> Cutoff Time: </label>
       <input name="cutoffTime" type="text" onChange={props.cutOffChange} value={props.cutOffValue}/>

       <label> Suggest a Date: </label>
       <input name="date" type="text" onChange={props.dateChange} value={props.dateValue}/>

       <label> Suggest a Time: </label>
       <input name="time" type="text" onChange={props.timeChange} value={props.timeValue}/>

       <label> Suggest a Location: </label>
       <input name="location" type="text" onChange={props.locationChange} value={props.locationValue}/>

       <input className= 'create-event-submit' type="submit" value="Submit"/>
     </form>
   </div>
 )
}

export default NewEventForm;
