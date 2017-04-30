import React, { Component } from 'react';
import NewEventForm from '../components/NewEventForm';
import NavContainer from './NavContainer';

class NewEventContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      errors: {},
      event: {},
      name: '',
      description: '',
      cutoff_time: '',
      date: '',
      user_id: '',
      time: '',
      location: '',
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
  }

  componentDidMount() {
    this.getUserData();
  }

  handleFormButtonClick() {
    if (this.state.formToggle == false) {
      this.setState({ formToggle: true })
    } else {
      this.setState({ formToggle: false })
    }
  }

  getUserData() {
    fetch(`/api/v1/users`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ user_id: responseData.user.id })
    });
  }

  handleSubmit(event){
    event.preventDefault();
    let eventPayload = {
       name: this.state.name,
       user_id: this.state.user_id,
       description: this.state.description,
       cutoff_time: this.state.cutoff_time,
       date: this.state.date,
       time: this.state.time,
       location: this.state.location
      }
      this.sendInput(eventPayload);
       this.handleClearForm();
   }

   sendInput(eventPayload) {
     fetch("/api/v1/events.json", {
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

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ description: event.target.value });
  }

  handleCutOffChange(event) {
    this.setState({ cutoff_time: event.target.value });
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
  }

  handleTimeChange(event) {
    this.setState({ time: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleClearForm() {
    this.setState({
      name: '',
      description: '',
      cutoff_time: '',
      date: '',
      time: '',
      location: ''
    })
  }

  render() {
    let className;
    if (this.state.formToggle) {
       className = 'selected'
     } else {
      className = 'hidden'
    };

    return(
      <div className="column row">
      <NewEventForm
         className = {className}
         handleFormButtonClick = {this.handleFormButtonClick}
         nameValue = {this.state.name}
         descriptionValue = {this.state.description}
         cutoffValue = {this.state.cutoffValue}
         dateValue = {this.state.dateValue}
         timeValue = {this.state.timeValue}
         locationValue = {this.state.locationValue}

         nameChange = {this.handleNameChange}
         descriptionChange = {this.handleDescriptionChange}
         cutOffChange = {this.handleCutOffChange}
         dateChange = {this.handleDateChange}
         timeChange = {this.handleTimeChange}
         locationChange = {this.handleLocationChange}

         handleSubmit = {this.handleSubmit}
       />
      </div>
    )
  }
}

export default NewEventContainer;
