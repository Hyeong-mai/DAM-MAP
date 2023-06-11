import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import styled from 'styled-components/native';
import Join from './Join';
import Login from './Login';

const Stack = createNativeStackNavigator();

const AuthContainer = styled.View`
  align-items: center;
  justify-content: center;
  background-color: white;
  flex: 1;
`;
const Title = styled.Text`
  font-weight: 600;
  color: white;
`;

const AuthScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTitle: () => false,
        headerTintColor: 'white',
        headerTransparent: true,
      }}>
      <Stack.Screen component={Login} name={'Login'} />
      <Stack.Screen component={Join} name={'Join'} />
    </Stack.Navigator>
  );
};
export default AuthScreen;
