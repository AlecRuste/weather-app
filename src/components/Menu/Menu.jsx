import React, { Component } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import './Menu.scss';
import escapeRegExp from 'escape-string-regexp';

class Menu extends Component {
  state = { country: '', city: '' };

  selectCountry(val) {
    this.setState({ country: val });
  }

  handleChange = event => {
    const { country } = this.state;
    country !== ''
      ? this.setState({ city: event.target.value })
      : alert('Please select country first');
  };

  handleSubmit = event => {
    const { country, city } = this.state;
    event.preventDefault();
    country && city ? this.props.updateLocation(country, city) : alert('select country and city');
  };

  render() {
    const { country, city } = this.state;
    return (
      <form className="menu__form" onSubmit={this.handleSubmit}>
        <CountryDropdown
          value={country}
          onChange={val => this.selectCountry(val)}
          valueType="short"
          size="1"
        />
        <label>
          <input
            className="menu__form__input"
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={this.handleChange}
          />
        </label>
        <input className="menu__form__button" type="submit" value="Update Location" />
      </form>
    );
  }
}

export default Menu;
