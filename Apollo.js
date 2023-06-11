import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
  useReactiveVar,
} from '@apollo/client';
import {offsetLimitPagination} from '@apollo/client/utilities';
import AsyncStorage from '@react-native-community/async-storage';
import {setContext} from '@apollo/client/link/context';
import {createUploadLink} from 'apollo-upload-client';

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar('');

const TOKEN = 'token';

export const logUserIn = async token => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  tokenVar(token);
};

export const logUserOut = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar('');
  } catch (exception) {
    console.log(exception);
  }
  client.resetStore();
};
const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeFeed: offsetLimitPagination(),
      },
    },
    Message: {
      fields: {
        user: {
          merge: true,
        },
      },
    },
  },
});
const uploadHttpLink = createUploadLink({
  uri: 'https://1ec6-106-245-0-178.ngrok-free.app/graphql',
});
// const httpLinks = createHttpLink({
//   uri: 'https://61ff-118-235-14-122.ngrok-free.app/graphql',
// });
const client = new ApolloClient({
  link: authLink.concat(uploadHttpLink),
  cache,
});
export default client;
