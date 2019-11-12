import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';

import imageLogo from '../../../assets/images/logo.png';
import background from '../../../assets/images/background.jpg';

import {getAuthKey} from '../../../config/auth';

export default class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    _interval = 0;
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content', true);
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    this._interval = setInterval(() => {
      this.checkAuthorized();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  checkAuthorized = async () => {
    try {
      const hasKey = await getAuthKey();
      this.props.navigation.navigate(hasKey ? 'App' : 'Auth');
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          <Image source={imageLogo} style={styles.logo} />
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
