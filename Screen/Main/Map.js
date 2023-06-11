import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MapContent from '../Sub/MapContent';
import Search from '../Sub/Search';
import {createStackNavigator} from '@react-navigation/stack';
import SlideDetail from '../Sub/SlideDetail';

const Stack = createNativeStackNavigator();

const Map = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'black',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        component={MapContent}
        name={'MapContent'}
      />
      <Stack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.boxColor,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTintColor: colors.fontColor,
          headerShadowVisible: false,
        }}
        component={Search}
        name={'Search'}
      />
      <Stack.Screen
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.boxColor,
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
          },
          headerTintColor: colors.fontColor,
          headerShadowVisible: false,
        }}
        component={SlideDetail}
        name={'SlideDetail'}
      />
    </Stack.Navigator>
  );
};

export default Map;
