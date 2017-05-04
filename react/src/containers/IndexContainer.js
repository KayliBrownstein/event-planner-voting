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

  componentDidMount() {
    this.getEventData();
  }

  getEventData() {
    fetch(`/api/v1/users`, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          events: responseData.events,
          user_id: responseData.current_user.id
        })
    });
  }

  handleFormButtonClick() {
    if (this.state.formToggle == false) {
      this.setState({ formToggle: true })
    } else {
      this.setState({ formToggle: false })
    }
  }

  handleSubmit(event){
    event.preventDefault();
    let eventPayload = {
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

   sendInput(eventPayload) {
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
    this.setState({ suggested_date: event.target.value });
  }

  handleTimeChange(event) {
    this.setState({ suggested_time: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ suggested_location: event.target.value });
  }

  handleClearForm() {
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
    if (this.state.formToggle) {
       className = 'selected'
     } else {
      className = 'hidden'
    };

    return(
      <div>
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
