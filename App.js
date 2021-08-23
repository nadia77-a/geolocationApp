import React, {Component} from 'react';
import {FlatList, View, Text} from 'react-native';
import ForecastCard from './components/ForecastCard';
import GetLocation from 'react-native-get-location';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: '',
    };
  }

  componentDidMount() {
    // Get the user's location
    this.getLocation();
  }
  //first  change
  getLocation() {
    // Get the current position of the user

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log('location', location);

        this.setState({
          latitude: location && location.latitude,
          longitude: location && location.longitude,
        });
        this.getWeather();
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     alert('position', position);
    //     this.setState(
    //       (prevState) => ({
    //         latitude: position && position.coords.latitude,
    //         longitude: position && position.coords.longitude,
    //       }),
    //       () => {
    //         this.getWeather();
    //       },
    //     );
    //   },
    //   (error) => this.setState({forecast: error.message}),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    // );
  }

  getWeather() {
    // Construct the API url to call
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.latitude +
      '&lon=' +
      this.state.longitude +
      '&units=metric&appid=bef710ad45c613f6b5e559dad3cbfe75';

    // Call the API, and set the state of the weather forecast
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState((prevState, props) => ({
          forecast: data,
        }));
      });
  }

  render() {
    return (
      <View>
        <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text>
        <Text>
          Country:{' '}
          {this.state.forecast.city && this.state.forecast.city.country}
        </Text>
        <Text>
          You are from{' '}
          {this.state.forecast.city && this.state.forecast.city.country} that
          has population{' '}
          {this.state.forecast.city && this.state.forecast.city.population}
        </Text>
        <FlatList
          data={this.state.forecast.list}
          style={{marginTop: 10}}
          keyExtractor={(item) => item.dt_txt}
          renderItem={({item}) => (
            <ForecastCard
              detail={item}
              location={this.state.forecast.city.name}
            />
          )}
        />
      </View>
    );
  }
}
