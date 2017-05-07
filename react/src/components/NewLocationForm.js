import React from 'react';

const NewLocationForm = props => {
 return(
   <div className="column row submit-location">
     <div className= 'new-location-button large-12 columns'>
       <center><button type="button" onClick={props.handleLocationFormButtonClick} className= 'button create-location'>Add a Location</button></center>
     </div>
     <form onSubmit={props.handleLocationSubmit} className={props.className} id="new-location">
       <label> Name: </label>
       <input name="name" type="text" onChange={props.nameChange} value={props.nameValue}/>

       <label> Description: </label>
       <textarea name="description" onChange={props.descriptionChange} value={props.descriptionValue}/>

       <label> Address: </label>
       <input name="address" type="text" onChange={props.addressChange} value={props.addressValue}/>

       <label> City: </label>
       <input name="city" type="text" onChange={props.cityChange} value={props.cityValue}/>

       <label> State: </label>
       <input name="state" type="text" onChange={props.stateChange} value={props.stateValue}/>

       <input className= 'create-location-submit' type="submit" value="Submit"/>
     </form>
   </div>
 )
}

export default NewLocationForm;
