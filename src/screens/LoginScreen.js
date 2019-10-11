import React, {Component} from 'react';
import {Image, StyleSheet, View, Text} from 'react-native';

import Button from '../components/LoginScreen/Button';
import FormTextInput from '../components/LoginScreen/FormTextInput';
import imageLogo from '../assets/images/logo.png';
import colors from '../config/colors';
import strings from '../config/strings';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends Component {
  passwordInputRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailTouched: false,
      passwordTouched: false,
      icEye: 'eye',
      securePass: true,
    };
  }

  handleEmailChange = email => {
    this.setState({email: email});
  };

  handlePasswordChange = password => {
    this.setState({password: password});
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({emailTouched: true});
  };

  handlePasswordBlur = () => {
    this.setState({passwordTouched: true});
  };

  handleLoginPress = () => {
    this.props.navigation.navigate('App');
  };

  isValidEmail = email => {
    const filter = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

    return String(email).search(filter) != -1;
  };

  handleDisabledButton = (email, password) => {
    const isDisable = !this.isValidEmail(email) || !password;

    return isDisable;
  };

  handleChangePwdType = () => {
    let newState;

    if (this.state.securePass) {
      newState = {
        icEye: 'eye-slash',
        securePass: false,
      };
    } else {
      newState = {
        icEye: 'eye',
        securePass: true,
      };
    }
    this.setState(newState);
  };

  render() {
    const {email, password, emailTouched, passwordTouched} = this.state;
    const emailError =
      !this.isValidEmail(email) && emailTouched
        ? !email
          ? strings.EMAIL_REQUIRED
          : strings.EMAIL_INVALID
        : undefined;
    const passwordError =
      !password && passwordTouched ? strings.PASSWORD_REQUIRED : undefined;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Image source={imageLogo} style={styles.logo} />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{strings.WELCOME_TO_LOGIN1}</Text>
            <Text style={styles.title}>{strings.WELCOME_TO_LOGIN2}</Text>
          </View>
          <FormTextInput
            onChangeText={this.handleEmailChange}
            onSubmitEditing={this.handleEmailSubmitPress}
            value={this.state.email}
            placeholder={strings.EMAIL_PLACEHOLDER}
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            onBlur={this.handleEmailBlur}
            error={emailError}
          />
          <View style={styles.passContainer}>
            <FormTextInput
              style={styles.password}
              ref={this.passwordInputRef}
              placeholder={strings.PASSWORD_PLACEHOLDER}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              secureTextEntry={this.state.securePass}
              returnKeyType="done"
              onBlur={this.handlePasswordBlur}
              error={passwordError}
            />
            <Icon
              name={this.state.icEye}
              size={25}
              color={colors.SILVER}
              onPress={this.handleChangePwdType}
            />
          </View>
          <Button
            label={strings.LOGIN}
            onPress={this.handleLoginPress}
            disabled={this.handleDisabledButton(email, password)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
  },
  logo: {
    flex: 1.5,
    resizeMode: 'contain',
    alignSelf: 'center',
    borderWidth: 5,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: strings.FONT,
    fontSize: 25,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  passContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  password: {
    flex: 1,
  },
});
