import React, {Component} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';

import {BarIndicator} from 'react-native-indicators';

import colors from '../config/colors';

export default class loading extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <BarIndicator color={colors.DARK_GREEN} count={5} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
