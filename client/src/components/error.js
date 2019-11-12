import React, {Component} from 'react';
import {
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import colors from '../config/colors';
import strings from '../config/strings';

import errorLogo from '../assets/images/error.gif';
import background from '../assets/images/background.jpg';

export default class error extends Component {
  render() {
    const {message, onPress} = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          <Image source={errorLogo} style={styles.error} />
          <Text style={styles.errorTxt}>{message}</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.errorTxt2}>{strings.TRYAGAIN}</Text>
          </TouchableOpacity>
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
  error: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  errorTxt: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
  },
  errorTxt2: {
    fontFamily: strings.FONT_SEMIBOLD,
    fontSize: 14,
    color: colors.BLUE,
  },
});
