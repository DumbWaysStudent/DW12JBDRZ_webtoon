import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import YouScreen from './YouScreen';
import FavouriteScreen from './FavouriteScreen';
import Profile from './Profile';
import colors from '../config/colors';
import strings from '../config/strings';

const YouScreenTab = createStackNavigator(
  {
    Home: YouScreen,
  },
  {
    headerMode: 'none',
  },
);
const FavouriteScreenTab = createStackNavigator(
  {
    Home: FavouriteScreen,
  },
  {
    headerMode: 'none',
  },
);
const ProfileScreenTab = createStackNavigator(
  {
    Home: Profile,
  },
  {
    headerMode: 'none',
  },
);
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
