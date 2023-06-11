import {StatusBar, useColorScheme, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import styled, {ThemeProvider} from 'styled-components/native';
import LoggedOut from './Navigation/LoggedOut';
import LoggedIn from './Navigation/LoggedIn';
import {NavigationContainer} from '@react-navigation/native';
import {darkTheme, lightTheme} from './styles';
import {ApolloProvider, useReactiveVar} from '@apollo/client';
import client, {cache, isLoggedInVar, tokenVar} from './Apollo';
import AsyncStorage from '@react-native-community/async-storage';
import {AsyncStorageWrapper, persistCache} from 'apollo3-cache-persist';
import {Appearance} from 'react-native';
import Splash from './Screen/Main/Splash';
const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const colorScheme = useColorScheme() === 'dark';
  const [loading, setLoading] = useState(true);
  const [run, setRun] = useState(true);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const loadingEnd = useCallback(async () => {
    await delay(2000);
    setRun(false);
    await delay(2000);
    setLoading(false);
  }, []);

  useEffect(() => {
    const preLoad = async () => {
      const LoggedVal = await AsyncStorage.getItem('token');
      if (LoggedVal) {
        isLoggedInVar(true);
        tokenVar(LoggedVal);
      }
      // await persistCache({
      //   cache,
      //   storage: new AsyncStorageWrapper(AsyncStorage),
      // });
      return loadingEnd();
    };
    preLoad();
  }, [loadingEnd]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={colorScheme ? darkTheme : lightTheme}>
        <StatusBar backgroundColor={'transparent'} translucent={true} />
        <NavigationContainer theme={colorScheme ? darkTheme : lightTheme}>
          {loading ? (
            <Splash run={run} />
          ) : isLoggedIn ? (
            <LoggedIn />
          ) : (
            <LoggedOut />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
};
export default App;
