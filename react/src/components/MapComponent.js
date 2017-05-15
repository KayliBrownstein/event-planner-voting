import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

let LOCATION_POSITION = {
  address: '77 Summer Street, Boston, MA',
  position: {
  latitude: 42.3601,
  longitude: -71.0589
  }
};

class MapComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      location_winner_address: '',
      coordinatesX: '',
      mapLoaded: false,
      isGeocodingError: false,
      foundAddress: LOCATION_POSITION,
      place_id: '',
      reviews: []
    }
    this.panToLocation = this.panToLocation.bind(this);
    this.geocodeAddress = this.geocodeAddress.bind(this);
    }

  componentDidMount(){
    let mapElement = this.mapElement;
  }

  componentWillReceiveProps(nextProps){
    this.setState({ location_winner_address: nextProps.winner_address})
    this.initMap();
    this.makeMarker();
    this.geocodeAddress(this.state.location_winner_address);
  }

  initMap(){
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 14,
      center: {
        lat: LOCATION_POSITION.position.latitude,
        lng: LOCATION_POSITION.position.longitude
      }
    });
  }

  makeMarker(){
    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: LOCATION_POSITION.position.latitude,
        lng: LOCATION_POSITION.position.longitude
      }
    });
    this.geocoder = new google.maps.Geocoder();
  }


  geocodeAddress(address){
    let that = this;
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status){
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          that.setState({
            foundAddress: results[0].formatted_address,
            isGeocodingError: false,
            coordinatesX: results[0].geometry.location
          });
          that.map.setCenter(results[0].geometry.location);
          that.marker.setPosition(results[0].geometry.location);
          return;
        }
      }

      that.setState({
        isGeocodingError: true,
        foundAddress: null
      }.bind(this));

      this.map.setCenter({
        lat: LOCATION_POSITION.position.latitude,
        lng: LOCATION_POSITION.position.longitude
      });
      this.marker.setPosition({
        lat: LOCATION_POSITION.position.latitude,
        lng: LOCATION_POSITION.position.longitude
      });
    });
    if (this.state.location_winner_address){
    var request = {
      location: this.map.getCenter(),
      radius: '500',
      query: this.state.location_winner_address
    };

    var service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, function (results, status){
      if (status == google.maps.places.PlacesServiceStatus.OK){
        that.setState({
          place_id: results[0].place_id,
          price_level: results[0].price_level,
          rating: results[0].rating
        });
      }
    })
  }
  }

  panToLocation() {
    this.map.panTo(this.state.coordinatesX);
  }

  render(){
    let map_options = {
      scrollwheel: false
    }
    return(
      <div>
        <div>
          <p>Price Level: {this.state.price_level}/4</p>
          <p>Rating: {this.state.rating}/5</p>
        </div>

        <div className="map-container">
          <button className='button submit-button' onClick={this.panToLocation}>Go to Location</button>
          <center><div className="map" ref="map">MAP HERE</div></center>
        </div>
      </div>
    )
  }
}

export default MapComponent;
