import React, {Component} from 'react';
import {StyleSheet, Share} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import YouScreen from './YouScreen';
import FavouriteScreen from './FavouriteScreen';
import ProfileScreen from './ProfileScreen';
import DetailScreen from './DetailScreen';
import ToonScreen from './ToonScreen';
import EditProfileScreen from './EditProfileScreen';
import CreateToonScreen from './CreateToonScreen';
import CreateMyToonScreen from './CreateMyToonScreen';
import CreateEpsToonScreen from './CreateEpsToonScreen';
import EditMyToonScreen from './EditMyToonScreen';

import colors from '../config/colors';
import strings from '../config/strings';

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

const YouScreenTab = createStackNavigator({
  Home: {
    screen: YouScreen,
    navigationOptions: () => ({
      header: null,
    }),
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: ({navigation}) => ({
      title: navigation.getParam('title', 'Detail'),
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
          name="share-alt"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => onShare('Share')}
        />
      ),
    }),
  },
  Toon: {
    screen: ToonScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Ep.' + navigation.getParam('index', '0'),
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
          name="share-alt"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => onShare('Share')}
        />
      ),
    }),
  },
});

YouScreenTab.navigationOptions = ({navigation}) => {
  const {routes} = navigation.state;
  let tabBarVisible;

  if (routes.length > 1) {
    routes.map(route => {
      if (route.routeName === 'Home') {
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

const FavouriteScreenTab = createStackNavigator(
  {
    Home: FavouriteScreen,
  },
  {
    headerMode: 'none',
  },
);

const ProfileScreenTab = createStackNavigator({
  Home: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Profile',
      headerStyle: {
        backgroundColor: colors.WHITE,
      },
      headerTintColor: colors.BLACK,
      headerTitleStyle: {
        fontFamily: strings.FONT,
        fontSize: 25,
      },
      headerRight: (
        <Icon
          name="pencil"
          size={28}
          style={styles.headerRightIcon}
          onPress={() => {
            navigation.navigate('Edit', navigation.state.params);
          }}
        />
      ),
    }),
  },
  Edit: {
    screen: EditProfileScreen,
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
            navigation.navigate('Home', navigation.state.params);
          }}
        />
      ),
    }),
  },
  CreateToon: {
    screen: CreateToonScreen,
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
    screen: CreateMyToonScreen,
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
  CreateEpsToon: {
    screen: CreateEpsToonScreen,
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
    screen: EditMyToonScreen,
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
});

ProfileScreenTab.navigationOptions = ({navigation}) => {
  const {routes} = navigation.state;
  let tabBarVisible;

  if (routes.length > 1) {
    routes.map(route => {
      if (route.routeName === 'Home' || route.routeName === 'Edit') {
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

const AppContainer = createAppContainer(
  createBottomTabNavigator(
    {
      You: YouScreenTab,
      Favourite: FavouriteScreenTab,
      Profile: ProfileScreenTab,
    },
    {
      defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          const {routeName} = navigation.state;

          if (routeName === 'You')
            return <Icon name="th-large" size={28} color={tintColor} />;
          else if (routeName == 'Favourite')
            return <Icon name="star" size={28} color={tintColor} />;
          else return <Icon name="user" size={28} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        labelStyle: {
          fontFamily: strings.FONT,
          fontSize: 14,
          margin: -5,
        },
        activeTintColor: colors.DARK_GREEN,
        inactiveTintColor: colors.SILVER,
      },
    },
  ),
);

export default class AppScreen extends Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  headerLeftIcon: {
    marginLeft: 10,
  },
  headerRightIcon: {
    marginRight: 10,
  },
});
