import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import StackFactoryNav from './StackFactoryNav';
import {useTheme} from '@react-navigation/native';

const Tabs = createBottomTabNavigator();

const LoggedIn = () => {
  const {colors} = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.boxColor,
          borderTopColor: colors.bgColor,
        },
        tabBarInactiveTintColor: colors.fontColor,
        tabBarActiveTintColor: colors.accent,
      }}>
      <Tabs.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={22}
            />
          ),
        }}
        name={'Map'}>
        {() => <StackFactoryNav screenName="Map" />}
      </Tabs.Screen>

      <Tabs.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'albums' : 'albums-outline'}
              color={color}
              size={22}
            />
          ),
        }}
        name={'Feed'}>
        {() => <StackFactoryNav screenName="Feed" />}
      </Tabs.Screen>

      <Tabs.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'heart' : 'heart-outline'}
              color={color}
              size={22}
            />
          ),
        }}
        name={'Notification'}>
        {}
        {() => <StackFactoryNav screenName="Notification" />}
      </Tabs.Screen>

      <Tabs.Screen
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              color={color}
              size={22}
            />
          ),
        }}
        name={'Profile'}>
        {() => <StackFactoryNav screenName="Profile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};
export default LoggedIn;
