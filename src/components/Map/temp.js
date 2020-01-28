import React, { Component } from 'react';
import Menu from './Menu';

let kaunas = { lat: 54.898467, lng: 23.90304 };

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      markers: [],
    };
  }

  componentDidMount() {
    this.fetchPlaces();
  }

  componentWillUpdate() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAWzWZTVs2qcSx3he4ypeHPtyX2cCIM0qk&callback=initMap'
    );
    window.initMap = this.initMap;
  };

  fetchPlaces() {
    let url = 'https://api.foursquare.com/v2/venues/explore?';
    let parameters = {
      client_id: '5N0B1L5B3G1N3MMQJP0STOJT4AJNUYEKLSJXHECZSXFDX1MV',
      client_secret: 'RWNTAMUODPHEWSJXAXCCZJZWZCR4YM22TTHO0FSGO5GLPBSQ',
      v: '20180323',
      query: 'universities',
      near: 'Kaunas',
      limit: '7',
    };

    fetch(url + new URLSearchParams(parameters))
      .then(response => response.json())
      .then(parsedJson => {
        this.setState({
          places: parsedJson.response.groups[0].items,
        });
      })
      .catch(error => alert('Foursquare error' + error));
  }

  initMap = () => {
    // Create map
    const map = new global.google.maps.Map(document.getElementById('map'), {
      center: { lat: kaunas.lat, lng: kaunas.lng },
      zoom: 13,
    });

    // Create info window
    const infowindow = new global.google.maps.InfoWindow();

    // Display markers
    this.state.places.map(place => {
      const contentString = `${place.venue.name} <br> 
                                   ${place.venue.location.address}`;

      // Create markers
      const marker = new global.google.maps.Marker({
        position: { lat: place.venue.location.lat, lng: place.venue.location.lng },
        map: map,
        animation: window.google.maps.Animation.DROP,
        name: place.venue.name,
      });

      this.state.markers.push(marker);

      // Click on the marker
      marker.addListener('click', function() {
        // Change info window content
        infowindow.setContent(contentString);

        // Open info window
        infowindow.open(map, marker);
      });
    });
  };

  // NOT WORKING
  /* 
    onMarkerUpdate = (showingMarkers) => {
        this.setState({
            markers: showingMarkers
      });
    }
    */

  render() {
    return (
      <main>
        <Menu
          places={this.state.places}
          markers={this.state.markers}
          //markersHandler={this.onMarkerUpdate}
        />
        <div id="map" role="application" aria-label="restaurant location"></div>
      </main>
    );
  }
}

export default Map;

function loadScript(url) {
  let index = document.getElementsByTagName('script')[0];
  let script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
  script.onerror = function(error) {
    document.write('Google Maps Error' + error);
  };
}
