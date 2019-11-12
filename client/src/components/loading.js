import React, {Component} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  ImageBackground,
} from 'react-native';

import loadImg from '../assets/images/loading.gif';
import background from '../assets/images/background.jpg';

import strings from '../config/strings';

export default class loading extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          <Image source={loadImg} style={styles.loading} />
          <Text style={styles.loadingTxt}>{strings.LOADING}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  bgImage: {
    resizeMode: 'cover',
    opacity: 0.6,
  },
  loading: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  loadingTxt: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
  },
});
