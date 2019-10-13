import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';

import colors from '../config/colors';
import metrics from '../config/metrics';

export default class ToonScreen extends Component {
  showToonLists = toon => {
    return (
      <View>
        <FlatList
          data={toon.pages}
          keyExtractor={list => list.index.toString()}
          renderItem={list => this.showToon(list.item)}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  showToon = item => {
    return (
      <View>
        <Image
          style={styles.showPages}
          source={{
            uri: item.imageURI,
          }}
        />
      </View>
    );
  };

  renderSub = () => {
    const {navigation} = this.props;
    const toon = navigation.state.params;

    return <View>{this.showToonLists(toon)}</View>;
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
  },
  showPages: {
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    resizeMode: 'contain',
  },
});
