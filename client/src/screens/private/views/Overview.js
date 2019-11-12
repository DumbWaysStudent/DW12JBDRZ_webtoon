import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  ImageBackground,
} from 'react-native';

import strings from '../../../config/strings';

import background from '../../../assets/images/background.jpg';

export default class Overview extends Component {
  render() {
    const {navigation} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          <View style={styles.content}>
            <Text style={styles.title}>{strings.OVERVIEW}</Text>
            <Text style={styles.overview}>
              {navigation.getParam('desc', 'No Text')}
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  bgImage: {
    resizeMode: 'cover',
    opacity: 0.6,
  },
  content: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    fontFamily: 'YeonSung-Regular',
    fontSize: 28,
  },
  overview: {
    fontFamily: 'YeonSung-Regular',
    textAlign: 'center',
    fontSize: 18,
  },
});
