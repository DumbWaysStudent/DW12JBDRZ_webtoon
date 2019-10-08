import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

import colors from '../config/colors';

export default class FormTextInput extends Component {
  textInputRef = React.createRef();

  focus = () => {
    if (this.textInputRef.current) {
      this.textInputRef.current.focus();
    }
  };

  render() {
    const {error, style, ...otherProps} = this.props;

    return (
      <View style={[styles.container, style]}>
        <TextInput
          ref={this.textInputRef}
          selectionColor={colors.DODGER_BLUE}
          style={[styles.textInput]}
          {...otherProps}
        />
        <Text style={styles.errorText}>{error || ''}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: colors.SILVER,
    borderBottomWidth: 5,
    fontFamily: 'Mansalva-Regular',
    fontSize: 20,
  },
  errorText: {
    height: 25,
    color: colors.TORCH_RED,
  },
});
