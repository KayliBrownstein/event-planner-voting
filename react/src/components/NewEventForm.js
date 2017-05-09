import React from 'react';

const NewEventForm = props => {
 return(
   <div className="column row submit-event">
     <div className= 'new-event-button'>
       <center><button type="button" onClick={props.handleFormButtonClick} className='button create-event small-12 medium-10 large-3 medium-centered large-centered columns'>Create an Event</button></center>
     </div>
     <form onSubmit={props.handleSubmit} className={props.className} id="new-event">
       <label> Name: </label>
       <input name="name" type="text" onChange={props.nameChange} value={props.nameValue}/>

       <label> Description: </label>
       <textarea name="description" onChange={props.descriptionChange} value={props.descriptionValue}/>

       <label> Cutoff Date: </label>
       <input name="cutoffTime" type="date" onChange={props.cutOffChange} value={props.cutOffValue}/>

       <input className= 'create-event-submit' type="submit" value="Submit"/>
     </form>
   </div>
 )
}

export default NewEventForm;
