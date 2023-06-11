import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import AuthScreen from '../Screen/Auth/AuthScreen';
import Join from '../Screen/Auth/Join';
import Login from '../Screen/Auth/Login';
import Welcome from '../Screen/Welcome';

const Stack = createNativeStackNavigator();

const LoggedOut = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTintColor: colors.accent,
        headerTransparent: true,
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        component={Welcome}
        name={'Welcome'}
      />
      {/* <Stack.Screen component={AuthScreen} name={'AuthScreen'} /> */}
      <Stack.Screen component={Login} name={'Login'} />
      <Stack.Screen component={Join} name={'Join'} />
    </Stack.Navigator>
  );
};
export default LoggedOut;
