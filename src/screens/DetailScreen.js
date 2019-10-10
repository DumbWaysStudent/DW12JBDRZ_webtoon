import React, {Component} from 'react';
import {View, StyleSheet, Image, FlatList, Text} from 'react-native';

import colors from '../config/colors';
import strings from '../config/strings';
import metrics from '../config/metrics';

export default class DetailScreen extends Component {
  showEpisodeLists = toon => {
    return (
      <View style={styles.toonEpisodeContainer}>
        <FlatList
          data={toon.episode}
          keyExtractor={list => list.index.toString()}
          renderItem={list => this.showEpisode(list.item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  showEpisode = item => {
    return (
      <View style={styles.episodeContainer}>
        <View style={styles.listEpisode}>
          <Image
            style={styles.showEpisode}
            source={{
              uri: item.imageURI,
            }}
          />
        </View>
        <View style={styles.epsNameContainer}>
          <Text style={styles.epsName}>Ep. {item.index}</Text>
          <Text style={styles.epsNameDate}>{item.dateAdded}</Text>
        </View>
      </View>
    );
  };

  showBanner = toon => {
    return (
      <View style={styles.toonImgContainer}>
        <View style={styles.toonImage}>
          <Image
            style={styles.showToonImg}
            source={{
              uri: toon.imageURI,
            }}
          />
        </View>
      </View>
    );
  };

  renderSub = () => {
    const {navigation} = this.props;
    const toon = navigation.state.params;

    return (
      <View style={styles.detailContainer}>
        {this.showBanner(toon)}
        {this.showEpisodeLists(toon)}
      </View>
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
    width: '103%',
  },
  detailContainer: {
    flex: 1,
  },
  toonImgContainer: {
    flex: 1,
  },
  toonImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  showToonImg: {
    width: metrics.DEVICE_WIDTH / 2,
    height: metrics.DEVICE_HEIGHT / 2,
    resizeMode: 'contain',
  },
  toonEpisodeContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  episodeContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  listEpisode: {
    borderWidth: 4,
    marginRight: 10,
  },
  showEpisode: {
    width: metrics.DEVICE_WIDTH / 5,
    height: metrics.DEVICE_HEIGHT / 7,
    resizeMode: 'contain',
  },
  epsNameContainer: {
    flex: 1,
  },
  epsName: {
    fontFamily: strings.FONT,
    fontSize: 22,
    marginTop: 10,
  },
  epsNameDate: {
    fontFamily: strings.FONT,
    fontSize: 18,
    opacity: 0.3,
  },
});
