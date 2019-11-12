import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';

import {textEllipsis, getDateStr} from '../../../config/utils';

import iconOne from '../../../assets/images/capitalletter.png';
import iconTwo from '../../../assets/images/book.png';
import background from '../../../assets/images/background.jpg';

export default class Details extends Component {
  showScreen = (screen, params) => {
    return this.props.navigation.navigate(screen, params);
  };

  showBanner = toon => {
    return (
      <View style={styles.bannerCont}>
        <Image
          style={styles.bannerImage}
          source={{
            uri: toon.image,
          }}
        />
      </View>
    );
  };

  renderSub = toon => {
    const text = toon.favorites.length > 1 ? ' likes' : ' like';

    return (
      <View style={styles.bannerTextCont}>
        <Text style={styles.bannerTextTitle}>{toon.title}</Text>
        <Text style={styles.bannerTextDate}>{getDateStr(toon.createdAt)}</Text>
        <View style={styles.toonLikeCont}>
          <Icon style={styles.toonLikeBtn} name="heart" size={16} />
          <Text style={styles.toonLikeText}>
            {toon.favorites.length}
            {text}
          </Text>
        </View>
        <View style={styles.toonBtnCont}>
          <View style={styles.toonBtnOne}>
            <Icon style={styles.toonBtn} name="share-alt" size={22} />
          </View>
          <View style={styles.toonBtnTwo}>
            <Icon
              style={styles.toonBtn}
              name="bookmark"
              size={22}
              color={colors.GOLD}
            />
          </View>
          <View style={styles.toonBtnThree}>
            <Icon
              style={styles.toonBtn}
              name="heart"
              size={22}
              color={colors.WHITE}
            />
          </View>
        </View>
        <View style={styles.buttonCont}>
          <TouchableOpacity
            style={styles.btnOne}
            onPress={() =>
              this.showScreen('Overview', {desc: toon.description})
            }>
            <Image style={styles.btnImageOne} source={iconOne} />
            <Text style={styles.btnText}>{strings.OVERVIEW}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnTwo}
            onPress={() => this.showScreen('Episodes', toon)}>
            <Image style={styles.btnImageTwo} source={iconTwo} />
            <Text style={styles.btnText}>{strings.EPISODES}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    const toon = navigation.state.params;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          {this.showBanner(toon)}
          {this.renderSub(toon)}
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
  bannerCont: {
    minHeight: 270,
    maxHeight: 270,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  bannerImage: {
    height: 270,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    resizeMode: 'cover',
  },
  bannerTextCont: {
    alignItems: 'center',
    marginTop: 30,
  },
  bannerTextTitle: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 22,
  },
  bannerTextDate: {
    marginTop: 5,
    fontFamily: strings.FONT_BOLD,
    fontSize: 18,
    color: colors.DARK_GRAY,
  },
  toonLikeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  toonLikeBtn: {
    color: colors.TORCH_RED,
  },
  toonLikeText: {
    marginLeft: 5,
    fontFamily: strings.FONT_BOLD,
    fontSize: 14,
  },
  toonBtnCont: {
    flexDirection: 'row',
    marginTop: 35,
  },
  toonBtnOne: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: colors.WHITE,
  },
  toonBtnTwo: {
    width: 50,
    height: 50,
    borderRadius: 15,
    marginHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    backgroundColor: colors.WHITE,
  },
  toonBtnThree: {
    width: 50,
    height: 50,
    backgroundColor: colors.TORCH_RED,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  buttonCont: {
    flexDirection: 'row',
    marginTop: 50,
    marginHorizontal: 25,
  },
  btnOne: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.WHITE,
    marginRight: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  btnTwo: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  btnImageOne: {
    width: 16,
    height: 16,
  },
  btnImageTwo: {
    width: 22,
    height: 22,
  },
  btnText: {
    marginLeft: 10,
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
  },
});
