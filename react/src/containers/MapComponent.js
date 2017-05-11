import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

let LOCATION_POSITION = {
  lat: 42.3601,
  lng: -71.0589
};

class MapComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      winning_location_address: '10 Windsor Road, Medford, MA',
      mapLoaded: false,

    }
    this.panToLocation = this.panToLocation.bind(this);
  }

  componentDidMount(){
    this.map = new google.maps.Map(this.refs.map, {
      center: LOCATION_POSITION,
      zoom: 11
    });
  }

  panToLocation() {
    this.map.panTo(LOCATION_POSITION);
  }

  render(){
    const mapStyle = {
      width: 500,
      height: 300,
      border: '1px solid black'
    };
    let map_options = {
      scrollwheel: false
    }
    return(
      <div className="map-container">
        <button onClick={this.panToLocation}>Go to Location</button>
        <center><div className="map" style={mapStyle} ref="map">MAP HERE</div></center>
      </div>
    )
  }
}

export default MapComponent;
