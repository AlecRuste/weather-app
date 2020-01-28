import React, { Component } from 'react';
import Map from '../../components/Map';

class Home extends Component {
  state = {
    browserPosition: null,
    weatherData: null,
  };

  componentDidMount() {
    this.getCurrentBrowserPosition();
  }

  getCurrentBrowserPosition = () => {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ browserPosition: position }),
      err => alert(err)
    );
  };

  render() {
    const { browserPosition, weatherData } = this.state;
    if (browserPosition) {
      return (
        <main>
          <p>Home</p>
          <Map centerPosition={browserPosition} />
        </main>
      );
    } else {
      return (
        <main>
          <p>Home</p>
        </main>
      );
    }
  }
}

export default Home;
