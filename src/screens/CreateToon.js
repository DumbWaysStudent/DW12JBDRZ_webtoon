import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, View, Image} from 'react-native';

import colors from '../config/colors';
import strings from '../config/strings';
import metrics from '../config/metrics';

export default class CreateToon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toons: [
        {
          title: 'Playing Yugi',
          imageURI: strings.IMAGE1_URL,
          count: 32,
        },
        {
          title: 'Jonouchi',
          imageURI: strings.IMAGE3_URL,
          count: 42,
        },
      ],
    };
  }

  showListToon = (toon, index) => {
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
          <Text style={styles.epsNameDate}>{toon.count} Episode(s)</Text>
        </View>
      </View>
    );
  };

  showListToonWindow = toons => {
    return (
      <View style={styles.listsContainer}>
        {toons.map((toon, index) => this.showListToon(toon, index))}
      </View>
    );
  };

  renderSub = () => {
    const {toons} = this.state;
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        {this.showListToonWindow(toons)}
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
