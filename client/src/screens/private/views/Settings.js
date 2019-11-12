import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';
import {removeAuthKey} from '../../../config/auth';
import resetAllData from '../../../_store/reset';

import avatar from '../../../assets/images/avatar.png';
import background from '../../../assets/images/background.jpg';

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: 'User',
        havePhoto: false,
        imageURI: '',
      },
    };
  }

  componentDidMount() {
    this.props.navigation.setParams(this.state.profile);
  }

  showPhoto = profile => {
    if (profile && profile.havePhoto) {
      return (
        <Image style={styles.showProfPhoto} source={{uri: profile.imageURI}} />
      );
    }
    return <Image style={styles.avatar} source={avatar} />;
  };

  showProfile = () => {
    const {profile} = this.state;
    const {params} = this.props.navigation.state;
    const data = params ? params : profile;

    return (
      <View style={styles.profileImgContainer}>
        <View style={styles.profileImg}>
          {this.showPhoto(data)}
          <Text style={styles.profileName}>{data.name}</Text>
          <TouchableOpacity
            style={styles.btnLogout}
            onPress={() => this.handleLogout()}>
            <Text style={styles.txtLogout}>{strings.LOGOUT}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  handleLogout = async () => {
    try {
      await removeAuthKey();
      this.props.resetAllData();
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.log(error);
    }
  };

  showProfileMenu = () => {
    return (
      <View style={styles.profMenuContainer}>
        <View style={styles.showProfMenu}>
          <Text style={styles.profMenuName}>{strings.CREATE_TOON_PAGE}</Text>
          <Icon
            name="chevron-right"
            size={28}
            onPress={() => this.props.navigation.navigate('MyToonKingdom')}
          />
        </View>
        <View style={styles.showProfMenu}>
          <View style={styles.menuButtonContainer}>
            <TouchableOpacity onPress={() => this.handleLogout()}>
              <Text style={styles.profMenuName}>{strings.LOGOUT}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderSub = () => {
    return (
      <View style={styles.profileContainer}>
        {this.showProfile()}
        {/* {this.showProfileMenu()} */}
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          {this.renderSub()}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  resetAllData,
};

export default connect(
  null,
  mapDispatchToProps,
)(MyProfile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
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
  profileContainer: {
    flex: 1,
  },
  profileImgContainer: {
    flex: 1,
  },
  profileImg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showProfPhoto: {
    width: metrics.DEVICE_WIDTH / 2.2,
    height: metrics.DEVICE_WIDTH / 2.2,
    resizeMode: 'cover',
    borderRadius: metrics.DEVICE_WIDTH / 2.2 / 2,
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
  },
  profileName: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 22,
    marginTop: 10,
  },
  btnLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    maxWidth: 100,
    minHeight: 50,
    maxHeight: 50,
    marginTop: 200,
    padding: 5,
    backgroundColor: colors.PASTEL_BLUE,
    borderRadius: 8,
    elevation: 3,
  },
  txtLogout: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
    color: colors.WHITE,
  },
  // profMenuContainer: {
  //   flex: 1,
  // },
  // menuButtonContainer: {
  //   flex: 1,
  // },
  // showProfMenu: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   borderBottomWidth: 4,
  //   padding: 20,
  // },
  // profMenuName: {
  //   fontFamily: strings.FONT,
  //   fontSize: 25,
  // },
});
