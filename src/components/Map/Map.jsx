import React, { Component } from 'react';
import './Map.scss';
import { GOOGLE_MAPS_KEY } from '../../config';

class Map extends Component {
  componentDidMount() {
    this.renderMap();
  }

  componentDidUpdate(prevProps) {
    if (this.props.weatherData !== prevProps.weatherData) this.renderMap();
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  };

  initMap = () => {
    const { weatherData } = this.props;
    if (weatherData.coord.lat && weatherData.coord.lon) {
      console.log(this.props.weatherData);
      const map = new global.google.maps.Map(document.getElementById('map'), {
        center: {
          lat: weatherData.coord.lat,
          lng: weatherData.coord.lon,
        },
        zoom: 10,
        disableDefaultUI: true,
        styles: [{ elementType: 'geometry', stylers: [{ color: '#19296c99' }] }],
      });

      const icon = {
        url: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      };

      const marker = new global.google.maps.Marker({
        position: {
          lat: weatherData.coord.lat,
          lng: weatherData.coord.lon,
        },
        map,
        animation: window.google.maps.Animation.DROP,
        icon,
      });
    }
  };

  render() {
    return <div id="map" role="application"></div>;
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
