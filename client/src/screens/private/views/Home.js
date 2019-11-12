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
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';

import {setHeaderAuth} from '../../../config/api';
import {getAuthKey} from '../../../config/auth';
import {textEllipsis, getDateStr} from '../../../config/utils';

import fetchAllToons from '../../../_store/toons';
import fetchFavorites from '../../../_store/favorites';
import resetAllData from '../../../_store/reset';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

import avatar from '../../../assets/images/avatar.png';
import favLoad from '../../../assets/images/heart.gif';
import background from '../../../assets/images/background.jpg';

import {
  METHOD_GET,
  METHOD_POST,
  METHOD_DELETE,
} from '../../../config/constants';

class ForYou extends Component {
  componentDidMount() {
    // this.props.resetAllData();
    this.handleGetAllToons();
    this.handleGetFavorite();
  }

  handleGetUserLogin = async () => {
    try {
      const user = await getAuthKey();
    } catch (error) {
      console.log(error);
    }
  };

  handleGetAllToons = async () => {
    try {
      const user = await getAuthKey();
      setHeaderAuth(user.token);
      this.props.fetchAllToons(user.id, false, null);
    } catch (error) {
      console.log(error);
    }
  };

  handleSearchToon = async title => {
    try {
      const user = await getAuthKey();
      this.props.fetchAllToons(user.id, true, title);
    } catch (error) {
      console.log(error);
    }
  };

  handleGetFavorite = async () => {
    try {
      const user = await getAuthKey();
      this.props.fetchFavorites(METHOD_GET, user.id, null);
    } catch (error) {
      console.log(error);
    }
  };

  handlePostFavorite = async toon_id => {
    try {
      const user = await getAuthKey();
      this.props.fetchFavorites(METHOD_POST, user.id, toon_id);
    } catch (error) {
      console.log(error);
    }
  };

  handleDelFavorite = async toon_id => {
    try {
      const user = await getAuthKey();
      this.props.fetchFavorites(METHOD_DELETE, user.id, toon_id);
    } catch (error) {
      console.log(error);
    }
  };

  showScreen = (screen, params) => {
    return this.props.navigation.navigate(screen, params);
  };

  showSearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={strings.SEARCH}
          onChangeText={title => this.handleSearchToon(title)}
        />
        <Icon style={styles.searchIcon} name="search" size={25} />
      </View>
    );
  };

  showImage = (banner, index) => {
    return (
      <View key={index} style={styles.imageCont}>
        <Image
          style={styles.image}
          source={{
            uri: banner.image,
          }}
        />
      </View>
    );
  };

  showFavItem = toon => {
    return (
      <View style={styles.favImageCont}>
        <TouchableOpacity
          style={styles.favImage}
          onPress={() => this.showScreen('MyToonDetail', toon)}>
          <Image
            style={styles.showFavImage}
            source={{
              uri: toon.image,
            }}
          />
        </TouchableOpacity>
        <View style={styles.favNameContainer}>
          <Text style={styles.favName}>{textEllipsis(toon.title, 19)}</Text>
          <Text style={styles.favDate}>{getDateStr(toon.createdAt)}</Text>
        </View>
      </View>
    );
  };

  showFavorites = favorites => {
    return (
      <FlatList
        data={favorites}
        renderItem={({item}) => this.showFavItem(item)}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  renderHeader = () => {
    return (
      <View style={styles.firstHeader}>
        <View style={styles.firstHeaderSub}>
          <Image style={styles.avatar} source={avatar} />
          <Text style={styles.headerText}>Hi User</Text>
        </View>
        <Icon style={styles.searchIcon} name="search" size={18} />
      </View>
    );
  };

  showHeader = favorites => {
    return (
      <View>
        {this.renderHeader()}
        {/* {this.showSearchBar()} */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{strings.FORYOU}</Text>
        </View>
        {this.showFavorites(favorites)}
        <View style={styles.listContainer}>
          {/* <Text style={styles.text}>{strings.ALL}</Text> */}
          <View style={styles.listOne}>
            <Text style={styles.textList}>Newest</Text>
          </View>
          <View style={styles.listTwo}>
            <Text style={[styles.textList, styles.textListDisable]}>
              Popular
            </Text>
          </View>
          <View style={styles.listThree}>
            <Text style={[styles.textList, styles.textListDisable]}>
              Featured
            </Text>
          </View>
        </View>
      </View>
    );
  };

  showBtnFav = (toon, favorites) => {
    const {data} = favorites;
    const found = data.find(fav => {
      return fav.id == toon.id;
    });

    if (found) {
      return (
        <TouchableOpacity onPress={() => this.handleDelFavorite(toon.id)}>
          <Icon style={styles.btnToonFav} name="heart" size={28} />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.handlePostFavorite(toon.id)}>
        <Icon style={styles.btnToonFav} name="heart-o" size={28} />
      </TouchableOpacity>
    );
  };

  showBtnFavToon = (toon, favorites) => {
    const {toon_id, isLoading} = favorites;

    if (isLoading && toon_id == toon.id) {
      return (
        <View style={styles.btnShowFav}>
          <Image source={favLoad} style={styles.favLoad} />
        </View>
      );
    }
    return (
      <View style={styles.btnShowFav}>{this.showBtnFav(toon, favorites)}</View>
    );
  };

  showToon = (toon, favorites) => {
    const text = toon.favorites.length > 1 ? ' likes' : ' like';

    return (
      <View style={styles.showToonCont}>
        <TouchableOpacity
          style={styles.showToon}
          onPress={() => this.showScreen('MyToonDetail', toon)}>
          <Image
            style={styles.toonImage}
            source={{
              uri: toon.image,
            }}
          />
        </TouchableOpacity>
        <View style={styles.toonNameCont}>
          <View style={styles.bookmarkCont}>
            <Text style={styles.toonName}>{textEllipsis(toon.title, 19)}</Text>
            <Icon
              style={styles.btnBookmark}
              name="bookmark"
              size={18}
              color={colors.GOLD}
            />
          </View>
          <Text style={styles.toonDate}>{getDateStr(toon.createdAt)}</Text>
          {/* {this.showBtnFavToon(toon, favorites)} */}
          <View style={styles.toonLikeCont}>
            <Icon style={styles.btnToonFav} name="heart" size={16} />
            <Text style={styles.toonLikeText}>
              {toon.favorites.length}
              {text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  renderSub = (toons, favorites) => {
    return (
      <FlatList
        data={toons}
        renderItem={({item}) => this.showToon(item, favorites)}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={this.showHeader(favorites)}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetAllToons()}
        refreshing={false}
      />
    );
  };

  render() {
    const {toons, favorites} = this.props;

    if (toons.error) {
      return <Error message={toons.error} onPress={this.handleGetAllToons} />;
    }

    if (toons.isLoading) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          {this.renderSub(toons.data, favorites.data)}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    toons: state.toons,
    favorites: state.favorites,
  };
};

const mapDispatchToProps = {
  fetchAllToons,
  fetchFavorites,
  resetAllData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForYou);

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
  firstHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginHorizontal: 25,
  },
  firstHeaderSub: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: 10,
  },
  headerText: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 14,
  },
  // searchContainer: {
  //   flexDirection: 'row',
  //   borderWidth: 4,
  //   marginTop: 10,
  //   marginHorizontal: 20,
  //   alignItems: 'center',
  // },
  // searchBar: {
  //   flex: 1,
  //   fontFamily: strings.FONT,
  //   fontSize: 20,
  //   padding: 10,
  // },
  // searchIcon: {
  //   marginHorizontal: 10,
  // },
  // bannerCont: {
  //   marginTop: 20,
  //   marginHorizontal: 20,
  //   borderWidth: 4,
  //   backgroundColor: colors.BROWN,
  // },
  // imageCont: {
  //   alignItems: 'center',
  // },
  // image: {
  //   width: metrics.DEVICE_WIDTH / 1.33,
  //   height: metrics.DEVICE_HEIGHT / 2.9,
  // },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 25,
  },
  text: {
    fontFamily: strings.FONT_BLACK,
    fontSize: 26,
  },
  // favWarn: {
  //   fontFamily: strings.FONT,
  //   fontSize: 16,
  //   color: colors.SILVER,
  // },
  favImageCont: {
    marginTop: 20,
    marginLeft: 25,
  },
  favImage: {
    minWidth: 180,
    maxWidth: 180,
    minHeight: 270,
    maxHeight: 270,
    borderRadius: 12,
    elevation: 5,
  },
  showFavImage: {
    width: 180,
    height: 270,
    borderRadius: 6,
    resizeMode: 'contain',
  },
  favNameContainer: {
    marginTop: 20,
    //  alignItems: 'center',
    //  padding: 5,
  },
  favName: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
  },
  favDate: {
    marginTop: 5,
    fontFamily: strings.FONT_BOLD,
    fontSize: 12,
    color: colors.DARK_GRAY,
  },
  listContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 25,
  },
  listOne: {
    flex: 1,
    height: 60,
    backgroundColor: colors.WHITE,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  listTwo: {
    flex: 1,
    height: 60,
    marginHorizontal: 3,
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  listThree: {
    flex: 1,
    height: 60,
    backgroundColor: colors.WHITE,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  textList: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
  },
  textListDisable: {
    color: colors.DARK_GRAY,
  },
  showToonCont: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 25,
  },
  showToon: {
    minWidth: 90,
    maxWidth: 90,
    minHeight: 135,
    maxHeight: 135,
    borderRadius: 8,
    elevation: 2,
  },
  toonImage: {
    width: 90,
    height: 135,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  toonNameCont: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'flex-start',
  },
  bookmarkCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  toonName: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 14,
  },
  toonDate: {
    marginTop: 5,
    fontFamily: strings.FONT_BOLD,
    fontSize: 12,
    color: colors.DARK_GRAY,
  },
  toonLikeCont: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  toonLikeText: {
    marginLeft: 5,
    fontFamily: strings.FONT_BOLD,
    fontSize: 12,
  },
  // btnShowFav: {
  //   alignItems: 'flex-start',
  // },
  btnToonFav: {
    color: colors.TORCH_RED,
  },
  // favLoad: {
  //   width: 28,
  //   height: 28,
  //   resizeMode: 'contain',
  // },
});
