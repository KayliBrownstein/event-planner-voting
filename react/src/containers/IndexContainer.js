import React, { Component } from 'react';
import AllEvents from '../components/AllEvents';
import NewEventForm from '../components/NewEventForm';

class IndexContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: {},
      events: [],
      name: '',
      description: '',
      cutoff_time: '',
      suggested_date: '',
      user_id: '',
      suggested_time: '',
      suggested_location: '',
      formToggle: false
    }
    this.handleFormButtonClick = this.handleFormButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCutOffChange = this.handleCutOffChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
  }

  componentDidMount(){
    this.getEventData();
  }

  getEventData(){
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          events: responseData.events,
          user_id: responseData.current_user.id
        })
    });
  }

  handleFormButtonClick(){
    if (this.state.formToggle == false) {
      this.setState({ formToggle: true })
    } else {
      this.setState({ formToggle: false })
    }
  }

  handleSubmit(event){
    event.preventDefault();
    if (
      this.validateNameChange(this.state.name),
      this.validateDescriptionChange(this.state.description),
      this.validateCutOffChange(this.state.cutoff_time),
      this.validateDateChange(this.state.suggested_date),
      this.validateTimeChange(this.state.suggested_time),
      this.validateLocationChange(this.state.suggested_location)
    ){
    let eventPayload ={
       name: this.state.name,
       user_id: this.state.user_id,
       description: this.state.description,
       cutoff_time: this.state.cutoff_time,
       suggested_date: this.state.suggested_date,
       suggested_time: this.state.suggested_time,
       suggested_location: this.state.suggested_location
      }
      this.sendInput(eventPayload);
      this.handleClearForm();
    }
   }

   sendInput(eventPayload){
     fetch('/api/v1/events', {
       credentials: 'same-origin',
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(eventPayload)
     })
     .then(response => response.json())
     .then(responseData => {
       this.setState({ events: [...this.state.events, responseData] });
     });
  }

  handleNameChange(event){
    this.setState({ name: event.target.value });
  }

  validateNameChange(name){
    if (name === '' || name === ' ') {
      let newError = { name: 'Name should not be blank' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.name;
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleDescriptionChange(event){
    this.setState({ description: event.target.value });
  }

  validateDescriptionChange(description){
    if (description === '' || description === ' ') {
      let newError = { description: 'Description should not be blank' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.description;
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleCutOffChange(event) {
    this.setState({ cutoff_time: event.target.value });
  }

  validateCutOffChange(cutoff_time) {
    if (cutoff_time === '' || cutoff_time === ' ') {
      let newError = { cutoff_time: 'Cutoff time should not be blank' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.cutoff_time;
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleDateChange(event) {
    this.setState({ suggested_date: event.target.value });
  }

  validateDateChange(suggested_date) {
    if (suggested_date === '' || suggested_date === ' ') {
      let newError = { suggested_date: 'Suggested date should not be blank' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.suggested_date;
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleTimeChange(event) {
    this.setState({ suggested_time: event.target.value });
  }

  validateTimeChange(suggested_time) {
    if (suggested_time === '' || suggested_time === ' ') {
      let newError = { suggested_time: 'Suggested time should not be blank' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.suggested_time;
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleLocationChange(event){
    this.setState({ suggested_location: event.target.value });
  }

  validateLocationChange(suggested_location){
    if (suggested_location === '' || suggested_location === ' ') {
      let newError = { suggested_location: 'Suggested location should not be blank' };
      this.setState({ errors: Object.assign(this.state.errors, newError) });
      return false;
    } else {
      let errorState = this.state.errors;
      delete errorState.suggested_location;
      this.setState({ errors: errorState });
      return true;
    }
  }

  handleClearForm(){
    this.setState({
      name: '',
      description: '',
      cutoff_time: '',
      suggested_date: '',
      suggested_time: '',
      suggested_location: ''
    })
  }

  render(){
    let className;
    if (this.state.formToggle){
       className = 'selected'
     } else {
      className = 'hidden'
    };

    let errorDiv;
    let errorItems;
    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      });
      errorDiv = <div className="callout alert">{errorItems}</div>
    }

    return(
      <div>
        {errorDiv}

        <NewEventForm
           className = {className}
           handleFormButtonClick = {this.handleFormButtonClick}
           nameValue = {this.state.name}
           descriptionValue = {this.state.description}
           cutOffValue = {this.state.cutoff_time}
           dateValue = {this.state.suggested_date}
           timeValue = {this.state.suggested_time}
           locationValue = {this.state.suggested_location}

           nameChange = {this.handleNameChange}
           descriptionChange = {this.handleDescriptionChange}
           cutOffChange = {this.handleCutOffChange}
           dateChange = {this.handleDateChange}
           timeChange = {this.handleTimeChange}
           locationChange = {this.handleLocationChange}

           handleSubmit = {this.handleSubmit}
         />
        <div className='column row'>
         <AllEvents
            events={this.state.events}
          />
        </div>
      </div>
    )
  }
}

export default IndexContainer;
