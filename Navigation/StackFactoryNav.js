import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Login from '../Screen/Auth/Login';
import Feed from '../Screen/Main/Feed';
import Map from '../Screen/Main/Map';
import Notification from '../Screen/Main/Notification';
import ProfileNav from './ProfileNav';

const Stack = createNativeStackNavigator();

const StackFactoryNav = ({screenName}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: 'white',
        headerTransparent: false,
        headerStyle: {
          backgroundColor: 'black',
        },
        headerShown: false,
      }}>
      {screenName === 'Feed' ? (
        <Stack.Screen
          name="Feed_Stack"
          component={Feed}
          options={{headerTitle: () => {}}}
        />
      ) : null}
      {screenName === 'Map' ? (
        <Stack.Screen name="Search_Stack" component={Map} />
      ) : null}
      {screenName === 'Notification' ? (
        <Stack.Screen name="Notification_Stack" component={Notification} />
      ) : null}
      {screenName === 'Profile' ? (
        <Stack.Screen
          name="Me_Stack"
          component={ProfileNav}
          options={{headerTitle: () => {}}}
        />
      ) : null}
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name='Profile' component={Profile} />
               <Stack.Screen name='Likes' component={Likes} />
               <Stack.Screen name='Comments' component={Comments} /> */}
    </Stack.Navigator>
  );
};
export default StackFactoryNav;
