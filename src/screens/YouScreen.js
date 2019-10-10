import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Image,
  StyleSheet,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-banner-carousel';
import colors from '../config/colors';
import strings from '../config/strings';
import metrics from '../config/metrics';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class YouScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toons: [
        {
          title: 'Playing Yugi',
          imageURI:
            'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c30c2824-fb37-4b0e-a4c9-d43c3f9e6aee/d3eq6nu-376a8946-9b38-411f-b3bd-4d83fa10248b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MzMGMyODI0LWZiMzctNGIwZS1hNGM5LWQ0M2MzZjllNmFlZVwvZDNlcTZudS0zNzZhODk0Ni05YjM4LTQxMWYtYjNiZC00ZDgzZmExMDI0OGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.O4_aMnTx80Pu0e_iujxChE4Fyo4nDhITaRBxvHFt3uk',
          favourite: true,
        },
        {
          title: 'Wandering Yugi',
          imageURI:
            'https://i.pinimg.com/originals/b6/d0/89/b6d08950ecd8e5c93fe564e74ae46dec.png',
          favourite: false,
        },
        {
          title: 'Jonouchi',
          imageURI:
            'http://pm1.narvii.com/6746/cb154c788fe053e1ccc35da347d803f43c18f403v2_00.jpg',
          favourite: true,
        },
      ],
    };
  }

  showSildes = (imageURI, index) => {
    return (
      <View key={index}>
        <Image
          style={styles.imageSlide}
          source={{
            uri: imageURI,
          }}
        />
      </View>
    );
  };

  showFavourites = (toon, index) => {
    return (
      <View key={index}>
        <View style={styles.favImage}>
          <Image
            style={styles.showFavImage}
            source={{
              uri: toon.imageURI,
            }}
          />
        </View>
        <View style={styles.favNameContainer}>
          <Text style={styles.favName}>{toon.title}</Text>
        </View>
      </View>
    );
  };

  showListsAll = (toon, index) => {
    const containerStyle = [
      styles.listNameBtn,
      toon.favourite ? styles.listNameBtnEnabled : styles.listNameBtnDisable,
    ];

    return (
      <View key={index} style={styles.showListContainer}>
        <View style={styles.listImage}>
          <Image
            style={styles.showListImage}
            source={{
              uri: toon.imageURI,
            }}
          />
        </View>
        <View style={styles.listNameContainer}>
          <Text style={styles.listName}>{toon.title}</Text>
          <View style={styles.listNameBtnContainer}>
            <TouchableOpacity style={containerStyle}>
              <Text style={styles.listNameBtnText}>+ Favourite</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderSub = () => {
    const {toons} = this.state;

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchBar} />
          <Icon
            style={styles.searchIcon}
            name="search"
            size={25}
            color={colors.BLACK}
          />
        </View>
        <View style={styles.slideContainer}>
          <Carousel
            autoplay
            autoplayTimeout={3000}
            loop
            index={0}
            pageSize={metrics.DEVICE_WIDTH}>
            {toons.map((toon, index) => this.showSildes(toon.imageURI, index))}
          </Carousel>
        </View>
        <Text style={styles.youString}>{strings.FAVOURITE}</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.favSlideContainer}>
            {toons.map((toon, index) => this.showFavourites(toon, index))}
          </View>
        </ScrollView>
        <Text style={styles.youString}>{strings.ALL}</Text>
        <View style={styles.listsContainer}>
          {toons.map((toon, index) => this.showListsAll(toon, index))}
        </View>
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
    height: metrics.DEVICE_HEIGHT / 4,
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
    height: metrics.DEVICE_WIDTH / 2,
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
    width: metrics.DEVICE_WIDTH / 4,
    height: metrics.DEVICE_WIDTH / 4,
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
