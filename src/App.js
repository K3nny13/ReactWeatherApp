import React from 'react';

import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY = '0dd6cce9212e29158de385d0dbab0df7'

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const API_CALL = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&units=metric&APPID='+API_KEY);
    const DATA = await API_CALL.json();
    console.log(DATA);
    if (DATA.name && DATA.sys.country) {
      this.setState({
        temperature: DATA.main.temp,
        city: DATA.name,
        country: DATA.sys.country,
        humidity: DATA.main.humidity,
        description: DATA.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Error"
      })
    }
  }
  render() {
    return (
      <div>
        <div className="wrapper">
            <div className="container">
            <div className="main">
              <div className="row">
                <div className="col-sm-5 title-container">
                  <Titles />
                </div>
                <div className="col-sm-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}/>
                </div>
              </div>
            </div>
          </div>
        </div>



      </div>
    );
  }
}

export default App;
