import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Image,
  Text,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../config/colors';
import strings from '../config/strings';
import metrics from '../config/metrics';

export default class FavouriteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toons: [
        {
          title: 'Playing Yugi',
          imageURI: strings.IMAGE1_URL,
          count: 100,
        },
        {
          title: 'Jonouchi',
          imageURI: strings.IMAGE3_URL,
          count: 80,
        },
      ],
    };
  }

  showSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} />
        <Icon
          style={styles.searchIcon}
          name="search"
          size={25}
          color={colors.BLACK}
        />
      </View>
    );
  };

  showListFav = (toon, index) => {
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
          <Text style={styles.epsNameDate}>{toon.count} + Favourite</Text>
        </View>
      </View>
    );
  };

  showListFavWindow = toons => {
    return (
      <View style={styles.listsContainer}>
        {toons.map((toon, index) => this.showListFav(toon, index))}
      </View>
    );
  };

  renderSub = () => {
    const {toons} = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.showSearchBar()}
        {this.showListFavWindow(toons)}
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
  },
  epsNameDate: {
    fontFamily: strings.FONT,
    fontSize: 18,
    opacity: 0.3,
  },
});
