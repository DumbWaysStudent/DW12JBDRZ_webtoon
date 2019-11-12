import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../../../config/colors';
import strings from '../../../config/strings';
import metrics from '../../../config/metrics';
import {getAuthKey} from '../../../config/auth';
import fetchFavorites from '../../../_store/favorites';
import fetchAllToons from '../../../_store/toons';
import Error from '../../../components/error';
import Loading from '../../../components/loading';

import favWarn from '../../../assets/images/zombie.gif';
import background from '../../../assets/images/background.jpg';

import {METHOD_GET} from '../../../config/constants';

class MyFavorite extends Component {
  handleGetUserFavs = async () => {
    try {
      const user = await getAuthKey();
      this.props.fetchFavorites(METHOD_GET, user.id, null);
      this.props.fetchAllToons(user.id, false, null);
    } catch (error) {
      console.log(error);
    }
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

  showUserFavs = favorite => {
    return (
      <View style={styles.showUserFavs}>
        <Image
          style={styles.favImage}
          source={{
            uri: favorite.image,
          }}
        />
      </View>
    );
  };

  renderHeader = favorites => {
    return (
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>Bookmarked</Text>
        <View style={styles.countMark}>
          <Text style={styles.countText}>{favorites.length}</Text>
        </View>
      </View>
    );
  };

  renderSub = (favorites, toons) => {
    if (!favorites.length) {
      return (
        <View style={styles.favWarnCont}>
          <Image source={favWarn} style={styles.favWarn} />
          <Text style={styles.favWarnTxt}>{strings.FAVWARN}</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={favorites}
        columnWrapperStyle={{justifyContent: 'center'}}
        renderItem={({item}) => this.showUserFavs(item, toons)}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={this.renderHeader(favorites)}
        showsVerticalScrollIndicator={false}
        onRefresh={() => this.handleGetUserFavs()}
        refreshing={false}
      />
    );
  };

  render() {
    const {favorites, toons} = this.props;

    if (favorites.error) {
      return (
        <Error message={favorites.error} onPress={this.handleGetUserFavs} />
      );
    }

    if (favorites.isLoading || toons.isLoading) return <Loading />;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={background}
          style={styles.background}
          imageStyle={styles.bgImage}>
          {this.renderSub(favorites.data, toons.data)}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    favorites: state.favorites,
    toons: state.toons,
  };
};

const mapDispatchToProps = {
  fetchFavorites,
  fetchAllToons,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyFavorite);

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
  //   alignSelf: 'center',
  //   marginRight: 10,
  // },
  headerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 25,
  },
  headerText: {
    fontFamily: strings.FONT_BLACK,
    fontSize: 22,
  },
  countMark: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 30,
    maxWidth: 30,
    minHeight: 20,
    maxHeight: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.DARK_BLUE,
  },
  countText: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 14,
    color: colors.WHITE,
  },
  showUserFavs: {
    marginHorizontal: 10,
    marginVertical: 5,
    minWidth: 90,
    maxWidth: 90,
    minHeight: 135,
    maxHeight: 135,
    borderRadius: 8,
    elevation: 2,
  },
  favImage: {
    width: 90,
    height: 135,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  favWarnCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favWarn: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  favWarnTxt: {
    fontFamily: strings.FONT_BOLD,
    fontSize: 16,
  },
  // favNameCont: {
  //   flex: 1,
  //   marginLeft: 10,
  //   justifyContent: 'flex-end',
  // },
  // favName: {
  //   fontFamily: strings.FONT,
  //   fontSize: 18,
  // },
  // favCountCont: {
  //   flexDirection: 'row',
  //   alignItems: 'flex-end',
  // },
  // favCount: {
  //   color: colors.TORCH_RED,
  //   marginRight: 10,
  // },
  // favCountTxt: {
  //   fontFamily: strings.FONT,
  //   fontSize: 18,
  //   opacity: 0.3,
  //   marginBottom: -3,
  // },
});
