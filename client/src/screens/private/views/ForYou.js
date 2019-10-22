import React, {Component} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-banner-carousel';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';
import {setHeaderAuth} from '../../../config/api';
import {getAuthKey} from '../../../config/auth';
import fetchAllToons from '../../../_store/toons';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

class ForYou extends Component {
  componentDidMount() {
    this.handleGetAllToons();
  }

  getAllToons = user_id => {
    this.props.fetchAllToons(user_id);
  };

  handleGetAllToons = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.getAllToons(user.id);
    } catch (error) {
      console.log(error);
    }
  };

  showScreen = (screen, params) => {
    return this.props.navigation.navigate(screen, params);
  };

  /**
   * const text = textEllipsis('a very long text', 10);
   * "a very ..."
   * const text = textEllipsis('a very long text', 10, { side: 'start' });
   * "...ng text"
   * const text = textEllipsis('a very long text', 10, { textEllipsis: ' END' });
   * "a very END"
   */
  textEllipsis = (str, maxLength, {side = 'end', ellipsis = '...'} = {}) => {
    if (str.length > maxLength) {
      switch (side) {
        case 'start':
          return ellipsis + str.slice(-(maxLength - ellipsis.length));
        case 'end':
        default:
          return str.slice(0, maxLength - ellipsis.length) + ellipsis;
      }
    }
    return str;
  };

  showSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchBar} placeholder={strings.SEARCH} />
        <Icon style={styles.searchIcon} name="search" size={25} />
      </View>
    );
  };

  showImage = (toon, index) => {
    return (
      <View key={index} style={styles.imageCont}>
        <Image
          style={styles.image}
          source={{
            uri: toon.image,
          }}
        />
      </View>
    );
  };

  showBanner = toons => {
    return (
      <View style={styles.bannerCont}>
        <Carousel
          autoplay
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={metrics.BANNER}>
          {toons.map((toon, index) => this.showImage(toon, index))}
        </Carousel>
      </View>
    );
  };

  showFavItem = toon => {
    return (
      <View style={styles.favImageCont}>
        <View style={styles.favImage}>
          <TouchableOpacity
            onPress={() => this.showScreen('MyToonDetail', toon)}>
            <Image
              style={styles.showFavImage}
              source={{
                uri: toon.image,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.favNameContainer}>
          <Text style={styles.favName}>
            {this.textEllipsis(toon.title, 18)}
          </Text>
        </View>
      </View>
    );
  };

  showFavorites = toons => {
    const favData = toons.filter(toon => {
      return toon.isFavorite;
    });
    if (favData.length > 0) {
      return (
        <FlatList
          data={favData}
          renderItem={({item}) => this.showFavItem(item)}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      );
    }
    return (
      <View style={styles.favImageCont}>
        <Text style={styles.favWarn}>{strings.FAVWARN}</Text>
      </View>
    );
  };

  showHeader = toons => {
    return (
      <View>
        {this.showBanner(toons)}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{strings.FAVORITE}</Text>
        </View>
        {this.showFavorites(toons)}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{strings.ALL}</Text>
        </View>
      </View>
    );
  };

  showToon = toon => {
    const containerStyle = [
      styles.toonBtn,
      toon.isFavorite ? styles.toonBtnDisabled : styles.toonBtnEnabled,
    ];

    return (
      <View style={styles.showToonCont}>
        <View style={styles.showToon}>
          <TouchableOpacity
            onPress={() => this.showScreen('MyToonDetail', toon)}>
            <Image
              style={styles.toonImage}
              source={{
                uri: toon.image,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.toonNameCont}>
          <Text style={styles.toonName}>
            {this.textEllipsis(toon.title, 18)}
          </Text>
          <View style={styles.toonBtnCont}>
            <TouchableOpacity style={containerStyle} onPress={null}>
              <Text style={styles.toonBtnText}>{strings.ADD_FAVORITE}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  renderSub = toons => {
    return (
      <FlatList
        data={toons}
        renderItem={({item}) => this.showToon(item)}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={this.showHeader(toons)}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetAllToons()}
        refreshing={false}
      />
    );
  };

  render() {
    const {toons} = this.props;

    if (toons.isLoading) return <Loading />;

    if (toons.error) {
      return (
        <Error message={toons.error.message} onPress={this.handleGetAllToons} />
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        {this.showSearchBar()}
        {this.renderSub(toons.data)}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    toons: state.toons,
  };
};

const mapDispatchToProps = {
  fetchAllToons,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForYou);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 4,
    marginTop: 10,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    fontFamily: strings.FONT,
    fontSize: 20,
    padding: 10,
  },
  searchIcon: {
    marginHorizontal: 10,
  },
  bannerCont: {
    marginTop: 20,
    marginHorizontal: 20,
    borderWidth: 4,
    backgroundColor: colors.BROWN,
  },
  imageCont: {
    alignItems: 'center',
  },
  image: {
    width: metrics.DEVICE_WIDTH / 1.33,
    height: metrics.DEVICE_HEIGHT / 2.9,
  },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    borderBottomWidth: 4,
  },
  text: {
    fontFamily: strings.FONT,
    fontSize: 28,
  },
  favWarn: {
    fontFamily: strings.FONT,
    fontSize: 18,
    color: colors.SILVER,
  },
  favImageCont: {
    marginTop: 10,
    marginLeft: 20,
    alignItems: 'center',
  },
  favImage: {
    borderWidth: 4,
  },
  showFavImage: {
    width: metrics.DEVICE_WIDTH / 3.3,
    height: metrics.DEVICE_HEIGHT / 3.91,
    resizeMode: 'contain',
  },
  favNameContainer: {
    alignItems: 'center',
    padding: 5,
  },
  favName: {
    fontFamily: strings.FONT,
    fontSize: 18,
  },
  showToonCont: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
  },
  showToon: {
    borderWidth: 4,
    justifyContent: 'center',
  },
  toonImage: {
    width: metrics.DEVICE_WIDTH / 5,
    height: metrics.DEVICE_HEIGHT / 5.9,
    resizeMode: 'contain',
  },
  toonNameCont: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  toonName: {
    fontFamily: strings.FONT,
    fontSize: 18,
    marginVertical: 10,
  },
  toonBtnCont: {
    alignItems: 'flex-start',
  },
  toonBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.DARK_GREEN,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  toonBtnEnabled: {
    opacity: 1,
  },
  toonBtnDisabled: {
    opacity: 0.3,
  },
  toonBtnText: {
    fontFamily: strings.FONT,
    color: colors.WHITE,
    fontSize: 16,
    padding: 10,
  },
});
