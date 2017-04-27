import React, { Component } from 'react';
import AllEvents from '../components/AllEvents';

class IndexContainer extends Component {
  constructor(props){
    super(props);
      this.state = {
        errors: {},
        events: [],
        event: {},
        name: '',
        description: '',
        cutoff_time: ''
      }
    }

  componentDidMount(){
    this.getData();
  }

  getData(){
    fetch(`/api/v1/events`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({ events: responseData });
      });
  }

  render(){
    return(
      <div className="column row">
        <AllEvents
          events={this.state.events}
        />
      </div>
    )
  }
}

export default IndexContainer;
