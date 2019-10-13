import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

import colors from '../../config/colors';

export default class Button extends Component {
  render() {
    const {disabled, label, onPress} = this.props;
    const containerStyle = [
      styles.container,
      disabled ? styles.containerDisabled : styles.containerEnabled,
    ];

    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        disabled={disabled}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.GREEN,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  containerEnabled: {
    opacity: 1,
  },
  containerDisabled: {
    opacity: 0.3,
  },
  text: {
    color: colors.WHITE,
    height: 20,
  },
});
