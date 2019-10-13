import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-banner-carousel';
import colors from '../config/colors';
import strings from '../config/strings';
import metrics from '../config/metrics';

export default class YouScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toons: [
        {
          title: 'Playing Yugi',
          imageURI: strings.IMAGE1_URL,
          favourite: true,
          episode: [
            {
              index: 1,
              imageURI: strings.IMAGE1_URL,
              dateAdded: '1 Desember 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
            {
              index: 2,
              imageURI: strings.IMAGE1_URL,
              dateAdded: '15 Desember 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
            {
              index: 3,
              imageURI: strings.IMAGE1_URL,
              dateAdded: '1 Januari 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
          ],
        },
        {
          title: 'Wandering Yugi',
          imageURI: strings.IMAGE2_URL,
          favourite: false,
          episode: [
            {
              index: 1,
              imageURI: strings.IMAGE2_URL,
              dateAdded: '1 Desember 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
            {
              index: 2,
              imageURI: strings.IMAGE2_URL,
              dateAdded: '15 Desember 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
            {
              index: 3,
              imageURI: strings.IMAGE2_URL,
              dateAdded: '1 Januari 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
          ],
        },
        {
          title: 'Jonouchi',
          imageURI: strings.IMAGE3_URL,
          favourite: true,
          episode: [
            {
              index: 1,
              imageURI: strings.IMAGE3_URL,
              dateAdded: '1 Desember 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
            {
              index: 2,
              imageURI: strings.IMAGE3_URL,
              dateAdded: '15 Desember 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
            {
              index: 3,
              imageURI: strings.IMAGE3_URL,
              dateAdded: '1 Januari 2018',
              pages: [
                {
                  index: 1,
                  imageURI: strings.IMAGE4_URL,
                },
                {
                  index: 2,
                  imageURI: strings.IMAGE5_URL,
                },
                {
                  index: 3,
                  imageURI: strings.IMAGE6_URL,
                },
              ],
            },
          ],
        },
      ],
    };
  }

  showScreen = (screen, params) => {
    return this.props.navigation.navigate(screen, params);
  };

  showSildes = (toon, index) => {
    return (
      <View key={index}>
        <Image
          style={styles.imageSlide}
          source={{
            uri: toon.imageURI,
          }}
        />
      </View>
    );
  };

  showFavourites = (toon, index) => {
    return (
      <View key={index}>
        <View style={styles.favImage}>
          <TouchableOpacity onPress={() => this.showScreen('Detail', toon)}>
            <Image
              style={styles.showFavImage}
              source={{
                uri: toon.imageURI,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.favNameContainer}>
          <Text style={styles.favName}>{toon.title}</Text>
        </View>
      </View>
    );
  };

  showListAll = (toon, index) => {
    const containerStyle = [
      styles.listNameBtn,
      toon.favourite ? styles.listNameBtnEnabled : styles.listNameBtnDisable,
    ];

    return (
      <View key={index} style={styles.showListContainer}>
        <View style={styles.listImage}>
          <TouchableOpacity onPress={() => this.showScreen('Detail', toon)}>
            <Image
              style={styles.showListImage}
              source={{
                uri: toon.imageURI,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.listNameContainer}>
          <Text style={styles.listName}>{toon.title}</Text>
          <View style={styles.listNameBtnContainer}>
            <TouchableOpacity style={containerStyle}>
              <Text style={styles.listNameBtnText}>{strings.ADD_FAVORITE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  showSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} placeholder={strings.SEARCH} />
        <Icon
          style={styles.searchIcon}
          name="search"
          size={25}
          color={colors.BLACK}
        />
      </View>
    );
  };

  showSlidesWindow = toons => {
    return (
      <View style={styles.slideContainer}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={metrics.DEVICE_WIDTH}>
          {toons.map((toon, index) => this.showSildes(toon, index))}
        </Carousel>
      </View>
    );
  };

  showFavouritesWindow = toons => {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.favSlideContainer}>
          {toons.map((toon, index) => this.showFavourites(toon, index))}
        </View>
      </ScrollView>
    );
  };

  showListsAllWindow = toons => {
    return (
      <View style={styles.listsContainer}>
        {toons.map((toon, index) => this.showListAll(toon, index))}
      </View>
    );
  };

  renderSub = () => {
    const {toons} = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.showSearchBar()}
        {this.showSlidesWindow(toons)}
        <Text style={styles.youString}>{strings.FAVOURITE}</Text>
        {this.showFavouritesWindow(toons)}
        <Text style={styles.youString}>{strings.ALL}</Text>
        {this.showListsAllWindow(toons)}
      </ScrollView>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>{this.renderSub()}</View>
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
  content: {
    flex: 1,
    width: '85%',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 4,
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    fontFamily: strings.FONT,
    fontSize: 20,
    padding: 10,
  },
  searchIcon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 4,
    marginTop: 20,
  },
  imageSlide: {
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT / 2.5,
    resizeMode: 'contain',
  },
  youString: {
    flex: 1,
    fontFamily: strings.FONT,
    fontSize: 25,
    marginTop: 10,
  },
  favSlideContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  favImage: {
    borderWidth: 4,
    marginRight: 15,
  },
  showFavImage: {
    width: metrics.DEVICE_WIDTH / 3,
    height: metrics.DEVICE_HEIGHT / 5,
    resizeMode: 'contain',
  },
  favNameContainer: {
    flex: 1,
    marginRight: 15,
    alignItems: 'center',
  },
  favName: {
    fontFamily: strings.FONT,
    fontSize: 18,
  },
  listsContainer: {
    flex: 1,
    marginTop: 20,
  },
  showListContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  listImage: {
    borderWidth: 4,
    marginRight: 10,
  },
  showListImage: {
    width: metrics.DEVICE_WIDTH / 5,
    height: metrics.DEVICE_HEIGHT / 7,
    resizeMode: 'contain',
  },
  listNameContainer: {
    flex: 1,
  },
  listName: {
    fontFamily: strings.FONT,
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
  },
  listNameBtnContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  listNameBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.DARK_GREEN,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  listNameBtnEnabled: {
    opacity: 1,
  },
  listNameBtnDisable: {
    opacity: 0.3,
  },
  listNameBtnText: {
    fontFamily: strings.FONT,
    color: colors.WHITE,
    fontSize: 16,
    padding: 10,
  },
});
