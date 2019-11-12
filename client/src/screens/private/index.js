import React from 'react';
import {StyleSheet, Share, Image} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import ForYou from './views/Home';
import MyFavorite from './views/Bookmarks';
import MyProfile from './views/Settings';
import Episodes from './views/Episodes';
import MyToon from './views/Pages';
import MyToonDetail from './views/Details';
import MyToonKingdom from './views/ToonKingdom';
import CreateMyToon from './views/crud/CreatePage';
import CreateEpisode from './views/crud/CreateEpisode';
import EditMyToon from './views/crud/EditPage';
import EditEpisode from './views/crud/EditEpisode';
import EditMyProfile from './views/crud/EditProfile';
import Overview from './views/Overview';

import houseEnable from '../../assets/images/houseenable.png';
import houseDisable from '../../assets/images/housedisable.png';
import agendaEnable from '../../assets/images/agendaenable.png';
import agendaDisable from '../../assets/images/agendadisable.png';
import settingsEnable from '../../assets/images/settingsenable.png';
import settingsDisable from '../../assets/images/settingsdisable.png';

import colors from '../../config/colors';
import strings from '../../config/strings';

const onShare = async shareMsg => {
  try {
    const result = await Share.share({
      message: shareMsg,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const ForYouStack = createStackNavigator(
  {
    ForYou: {
      screen: ForYou,
    },
    MyToonDetail: {
      screen: MyToonDetail,
    },
    Episodes: {
      screen: Episodes,
    },
    MyToon: {
      screen: MyToon,
    },
    Overview: {
      screen: Overview,
    },
  },
  {
    headerMode: 'none',
  },
);

ForYouStack.navigationOptions = ({navigation}) => {
  const {routes} = navigation.state;
  let tabBarVisible;

  routes.map(route => {
    if (route.routeName === 'ForYou') {
      tabBarVisible = true;
    } else {
      tabBarVisible = false;
    }
  });

  return {
    tabBarVisible,
  };
};

const MyFavoriteStack = createStackNavigator(
  {
    MyFavorite: {
      screen: MyFavorite,
    },
  },
  {
    headerMode: 'none',
  },
);

const MyProfileStack = createStackNavigator({
  MyProfile: {
    screen: MyProfile,
    navigationOptions: () => ({
      header: null,
    }),
  },
  EditMyProfile: {
    screen: EditMyProfile,
    navigationOptions: ({navigation}) => ({
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {
            navigation.navigate('MyProfile', navigation.state.params);
          }}
        />
      ),
    }),
  },
  MyToonKingdom: {
    screen: MyToonKingdom,
    navigationOptions: ({navigation}) => ({
      title: 'My Toon Kingdom',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
    }),
  },
  CreateMyToon: {
    screen: CreateMyToon,
    navigationOptions: ({navigation}) => ({
      title: 'Create My Toon',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {}}
        />
      ),
    }),
  },
  CreateEpisode: {
    screen: CreateEpisode,
    navigationOptions: ({navigation}) => ({
      title: 'Create Episode',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {}}
        />
      ),
    }),
  },
  EditMyToon: {
    screen: EditMyToon,
    navigationOptions: ({navigation}) => ({
      title: 'Edit My Toon',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {}}
        />
      ),
    }),
  },
  EditEpisode: {
    screen: EditEpisode,
    navigationOptions: ({navigation}) => ({
      title: 'Edit Episode',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerLeft: (
        <Icon
          name="arrow-left"
          size={28}
          style={styles.headerLeftIcon}
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: (
        <Icon
          name="check"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {}}
        />
      ),
    }),
  },
});

MyProfileStack.navigationOptions = ({navigation}) => {
  const {routes} = navigation.state;
  let tabBarVisible;

  if (routes.length > 1) {
    routes.map(route => {
      if (
        route.routeName === 'MyProfile' ||
        route.routeName === 'EditMyProfile'
      ) {
        tabBarVisible = true;
      } else {
        tabBarVisible = false;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const AppStack = createBottomTabNavigator(
  {
    ForYou: ForYouStack,
    MyFavorite: MyFavoriteStack,
    MyProfile: MyProfileStack,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused}) => {
        const {routeName} = navigation.state;

        if (routeName === 'ForYou') {
          const uri = focused ? houseEnable : houseDisable;

          return <Image source={uri} style={styles.bottomlogo} />;
        } else if (routeName == 'MyFavorite') {
          const uri = focused ? agendaEnable : agendaDisable;

          return <Image source={uri} style={styles.bottomlogo} />;
        } else {
          const uri = focused ? settingsEnable : settingsDisable;

          return <Image source={uri} style={styles.bottomlogo} />;
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        height: 50,
        backgroundColor: colors.DARK_BLUE,
      },
    },
  },
);

const styles = StyleSheet.create({
  headerLeftIcon: {
    marginLeft: 10,
  },
  headerRightIcon: {
    marginRight: 10,
  },
  bottomlogo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
});

export default AppStack;
