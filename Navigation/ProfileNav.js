import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import styled, {useTheme} from 'styled-components/native';
import ProfileSet from '../Screen/Sub/ProfileSet';
import ProfileUser from '../Screen/Sub/ProfileUser';

const Stack = createNativeStackNavigator();

const ProfileContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: black;
`;

const ProfileNav = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.fontColor,
        headerBackTitleVisible: false,
      }}>
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
          headerShadowVisible: false,
        }}
        name="User"
        component={ProfileUser}
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
          headerShadowVisible: false,
        }}
        name="Set"
        component={ProfileSet}
      />
    </Stack.Navigator>
  );
};
export default ProfileNav;
