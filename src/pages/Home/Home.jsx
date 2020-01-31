import React, { Component } from 'react';
import Map from '../../components/Map';
import Menu from '../../components/Menu';
import './Home.scss';
import { OPEN_WEATHER_KEY } from '../../config';

class Home extends Component {
  state = {
    weatherData: null,
  };

  componentDidMount() {
    this.getCurrentBrowserPosition();
  }

  getCurrentBrowserPosition = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => this.fetchWeatherData(position),
      err => alert(err)
    );
  };

  fetchWeatherData = position => {
    const latitude = Math.round(position.coords.latitude);
    const longitude = Math.round(position.coords.longitude);
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=`;
    const key = OPEN_WEATHER_KEY;
    fetch(url + key)
      .then(response => response.json())
      .then(parsedJson => {
        this.setState({ weatherData: parsedJson });
      })
      .catch(error => alert('API Error' + error));
  };

  updateLocation = (country, city) => {
    this.updateWeatherData(country, city);
  };

  updateWeatherData = (country, city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=`;
    const key = OPEN_WEATHER_KEY;
    fetch(url + key)
      .then(response => response.json())
      .then(parsedJson => {
        this.setState({ weatherData: parsedJson });
      })
      .catch(error => alert('API Error' + error));
  };

  render() {
    const { weatherData } = this.state;
    if (weatherData) {
      return (
        <main className="main">
          <section className="weather">
            <div className="weather__data">
              <div className="weather__data__main">
                <div className="weather__data__main__city">{weatherData.name}</div>
                <div className="weather__data__main__info">
                  <img
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="weathericon"
                    className="weather__data__main__icon"
                  />
                  <div className="weather__data__main__temperature">
                    {weatherData.main.temp.toFixed(1)}&#176;C
                  </div>
                </div>
              </div>

              <div className="weather__data__plus">
                <div className="weather__data__plus__item">
                  Pressure: {weatherData.main.pressure} hPa
                </div>
                <div className="weather__data__plus__item">
                  Humidity: {weatherData.main.humidity}%
                </div>
                <div className="weather__data__plus__item">Wind: {weatherData.wind.speed} m/s</div>
              </div>
            </div>
          </section>
          <section className="map">
            <Map weatherData={weatherData} />
          </section>
          <section className="menu">
            <Menu
              country={this.state.country}
              city={this.state.city}
              updateLocation={this.updateLocation}
            />
          </section>
        </main>
      );
    } else {
      return (
        <main className="activity-indicator">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
            alt="Activity Indicator"
          />
        </main>
      );
    }
  }
}

export default Home;
