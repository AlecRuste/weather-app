import React, { Component } from 'react';
import './Map.scss';
import { GOOGLE_MAPS_KEY, OPEN_WEATHER_KEY } from '../../config';

class Map extends Component {
  state = {
    weatherData: {},
  };

  componentDidMount() {
    this.fetchWeatherData();
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  };

  fetchWeatherData = () => {
    const latitude = Math.round(this.props.centerPosition.coords.latitude);
    const longitude = Math.round(this.props.centerPosition.coords.longitude);
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=`;
    const key = OPEN_WEATHER_KEY;
    fetch(url + key)
      .then(response => response.json())
      .then(parsedJson => {
        this.setState({ weatherData: parsedJson }, this.renderMap());
      })
      .catch(error => alert('API Error' + error));
  };

  initMap = () => {
    const { weatherData } = this.state;
    const map = new global.google.maps.Map(document.getElementById('map'), {
      center: {
        lat: this.props.centerPosition.coords.latitude,
        lng: this.props.centerPosition.coords.longitude,
      },
      zoom: 14,
    });

    map.data.loadGeoJson('https://storage.googleapis.com/mapsdevsite/json/google.json');

    const icon = {
      url: `http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`, // url
      scaledSize: new global.google.maps.Size(75, 75),
    };

    const marker = new global.google.maps.Marker({
      position: {
        lat: this.props.centerPosition.coords.latitude,
        lng: this.props.centerPosition.coords.longitude,
      },
      map,
      animation: window.google.maps.Animation.DROP,
      icon,
    });
  };

  render() {
    return (
      <main>
        <div id="map" role="application"></div>
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
