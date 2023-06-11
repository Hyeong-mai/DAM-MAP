import {gql, useMutation} from '@apollo/client';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import styled, {css, useTheme} from 'styled-components/native';
import {logUserIn} from '../../Apollo';
import AuthButton from '../../Commponents/Auth/AuthButton';
import AuthLayout from '../../Commponents/Auth/AuthLayout';
import {TextInput} from '../../Commponents/Auth/AutInput';

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Container = styled.View`
  background-color: ${props => props.theme.colors.boxColor};
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const JoinButton = styled.TouchableOpacity`
  border-radius: 5px;
  margin-top: 15px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const JoinTitle = styled.Text`
  color: ${props => props.theme.colors.accent};
  font-size: 13px;
`;

export const Login = ({navigation, route: {params}}) => {
  const {colors} = useTheme();
  const FocusStyle = {borderColor: colors.accent};
  const [login, {loading}] = useMutation(LOGIN_MUTATION);
  const [focusVal, setFocusVal] = useState('');
  const {register, handleSubmit, setValue, watch} = useForm({
    defaultValues: {
      username: params?.username || '',
      password: params?.password || '',
    },
  });
  const userNameRef = useRef();
  const passwordRef = useRef();
  const OnNext = NextOne => {
    NextOne?.current?.focus();
  };
  const gotoJoin = () => {
    // navigation.navigate('AuthScreen', {page: 'join'});
    navigation.navigate('Join');
  };
  const onFocus = focusItem => {
    setFocusVal(focusItem);
  };
  useEffect(() => {
    register('username', {
      required: true,
    });
    register('password', {
      required: true,
    });
  }, [register]);
  //   const onCompleted = async ({login: {ok, token, error}}) => {
  //     if (!ok) {
  //       if (error) {
  //         alert(error);
  //       }
  //       return;
  //     }
  //     //     await logUserIn(token);
  //   };
  const onCompleted = async ({login: {ok, token, error}}) => {
    if (!ok) {
      if (error) {
        alert(error);
      }
      return;
    }
    logUserIn(token);
  };
  const onValid = data => {
    if (!loading) {
      login({
        variables: {
          ...data,
        },
        onCompleted,
      });
    }
  };
  return (
    <Container>
      <AuthLayout>
        <TextInput
          value={watch('username')}
          ref={userNameRef}
          style={focusVal === 'username' ? FocusStyle : null}
          placeholder="UserName"
          autoCapitalize="none"
          placeholderTextColor="gray"
          returnKeyType="next"
          onSubmitEditing={() => OnNext(passwordRef)}
          onChangeText={text => setValue('username', text)}
          onFocus={() => onFocus('username')}
          onBlur={() => onFocus('')}
        />
        <TextInput
          value={watch('password')}
          ref={passwordRef}
          style={focusVal === 'password' ? FocusStyle : null}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="gray"
          returnKeyType="done"
          lastOne={true}
          onSubmitEditing={handleSubmit(onValid)}
          onChangeText={text => setValue('password', text)}
          onFocus={() => onFocus('password')}
          onBlur={() => onFocus('')}
        />
        <AuthButton
          disabled={!watch('username') || !watch('password')}
          loading={loading}
          Text="Log In"
          onPress={handleSubmit(onValid)}></AuthButton>
        <JoinButton onPress={() => gotoJoin()}>
          <JoinTitle>Go to Create Account</JoinTitle>
        </JoinButton>
      </AuthLayout>
    </Container>
  );
};

export default Login;
