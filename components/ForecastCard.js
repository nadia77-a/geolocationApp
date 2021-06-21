import React, {Component} from 'react';

import {StyleSheet, View, Image} from 'react-native';
import {Text, Card, Divider} from 'react-native-elements';

class ForecastCard extends Component {
  render() {
    //test changelog
    let time;
    // Create a new date from the passed date time
    var date = new Date(this.props.detail.dt * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = '0' + date.getMinutes();
    time = hours + ':' + minutes.substr(-2);
    //test changelog
    //testtttttt//
    //test222
   // feat: add standard release support
    return (
      <Card containerStyle={styles.card}>
        <Text style={styles.notes}>{this.props.location}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Image
            style={{width: 70, height: 70}}
            source={{
              uri:
                'https://openweathermap.org/img/w/' +
                this.props.detail.weather[0].icon +
                '.png',
            }}
          />
          <Text style={styles.time}>
            {date.getDate()}/{date.getMonth()}/{date.getFullYear()} {time}
          </Text>
        </View>
        <Divider style={{backgroundColor: '#dfe6e9', marginVertical: 5}} />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.notes}>
            {this.props.detail.weather[0].description}
          </Text>
          <Text style={styles.notes}>
            {Math.round(this.props.detail.main.temp * 10) / 10}&#8451;
          </Text>
        </View>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(56, 172, 236, 1)',
    borderWidth: 0,
    borderRadius: 20,
  },
  time: {
    fontSize: 24,
  },
  notes: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});

export default ForecastCard;
//test on version 1
