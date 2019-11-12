import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import fetchEpisodes from '../../../_store/episodes';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';

import Error from '../../../components/error';
import Loading from '../../../components/loading';

import background from '../../../assets/images/background.jpg';

class Episodes extends Component {
  componentDidMount() {
    const {episodes, navigation} = this.props;
    const toon = navigation.state.params;

    if (episodes.toon_id != toon.id) this.handleGetEpisodes(toon.id);
  }

  handleGetEpisodes = toon_id => {
    this.props.fetchEpisodes(toon_id);
  };

  showScreen = (screen, params) => {
    return this.props.navigation.navigate(screen, params);
  };

  showEpisode = episode => {
    return (
      <View style={styles.showEpsCont}>
        <View style={styles.showEps}>
          <Image
            style={styles.epsImage}
            source={{
              uri: episode.image,
            }}
          />
        </View>
        <View style={styles.epsNameCont}>
          <Text style={styles.epsName}>{episode.title}</Text>
          <TouchableOpacity
            style={styles.btnRead}
            onPress={() => this.showScreen('MyToon', episode)}>
            <Text style={styles.readText}>{strings.READ}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderSub = (toon, episodes) => {
    return (
      <FlatList
        data={episodes}
        renderItem={({item}) => this.showEpisode(item)}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetEpisodes(toon.id)}
        refreshing={false}
      />
    );
  };

  render() {
    const {episodes, navigation} = this.props;
    const toon = navigation.state.params;

    if (episodes.error) {
      return (
        <Error
          message={episodes.error}
          onPress={() => this.handleGetEpisodes(toon.id)}
        />
      );
    }

    if (episodes.isLoading || episodes.toon_id != toon.id) {
      return <Loading />;
    }

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          <View style={styles.content}>
            {this.renderSub(toon, episodes.data)}
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.episodes,
  };
};

const mapDispatchToProps = {
  fetchEpisodes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Episodes);

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
  content: {
    marginTop: 50,
    marginHorizontal: 25,
  },
  showEpsCont: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: colors.WHITE,
    elevation: 5,
  },
  showEps: {
    minWidth: 86,
    maxWidth: 86,
    minHeight: 137,
    maxHeight: 137,
    borderWidth: 2,
    borderColor: colors.SILVER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  epsImage: {
    width: 90,
    height: 133,
    resizeMode: 'contain',
  },
  epsNameCont: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  epsName: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
    marginTop: 20,
  },
  btnRead: {
    minWidth: 78,
    maxWidth: 78,
    padding: 10,
    borderRadius: 4,
    backgroundColor: colors.PASTEL_BLUE,
  },
  readText: {
    fontFamily: strings.FONT_BOLD,
    color: colors.WHITE,
    fontSize: 12,
  },
});
