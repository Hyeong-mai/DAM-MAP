import {gql, useMutation} from '@apollo/client';
import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import styled, {useTheme} from 'styled-components/native';
import AuthButton from '../../Commponents/Auth/AuthButton';
import AuthLayout from '../../Commponents/Auth/AuthLayout';
import {TextInput} from '../../Commponents/Auth/AutInput';

const JOIN_MUTAION = gql`
  mutation createAccount(
    $firstName: String!
    $username: String!
    $email: String!
    $password: String!
    $lastName: String
  ) {
    createAccount(
      firstName: $firstName
      username: $username
      email: $email
      password: $password
      lastName: $lastName
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  background-color: ${props => props.theme.colors.bgColor};
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
`;

const Join = ({navigation}) => {
  const {register, handleSubmit, setValue, watch, getValues} = useForm();
  const [createAccount, {loading}] = useMutation(JOIN_MUTAION);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const {colors} = useTheme();
  const FocusStyle = {borderColor: colors.accent};
  const [focusVal, setFocusVal] = useState('');

  const onFocus = focusItem => {
    setFocusVal(focusItem);
  };

  const OnNext = NextOne => {
    NextOne?.current?.focus();
  };

  useEffect(() => {
    register('username', {
      required: true,
    });
    register('password', {
      required: true,
    });
    register('firstName', {
      required: true,
    });
    register('lastName', {
      required: true,
    });
    register('email', {
      required: true,
    });
  }, [register]);
  const onCompleted = ({createAccount: {ok, error}}) => {
    console.log(ok);
    if (!ok) {
      alert(error);
      return;
    }
    const {username, password} = getValues();
    navigation.navigate('Login', {
      username,
      password,
    });
    setValue('username', '');
    setValue('password', '');
    setValue('firstName', '');
    setValue('lastName', '');
    setValue('email', '');
  };

  const onValid = data => {
    if (!loading) {
      createAccount({
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
          ref={usernameRef}
          placeholder="UserName"
          autoCapitalize="none"
          placeholderTextColor="gray"
          returnKeyType="next"
          onSubmitEditing={() => OnNext(passwordRef)}
          onChangeText={text => setValue('username', text)}
          onFocus={() => onFocus('username')}
          onBlur={() => onFocus('')}
          style={focusVal === 'username' ? FocusStyle : null}
        />
        <TextInput
          value={watch('password')}
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="gray"
          returnKeyType="done"
          onSubmitEditing={() => OnNext(firstNameRef)}
          onChangeText={text => setValue('password', text)}
          onFocus={() => onFocus('password')}
          onBlur={() => onFocus('')}
          style={focusVal === 'password' ? FocusStyle : null}
        />
        <TextInput
          value={watch('firstName')}
          ref={firstNameRef}
          placeholder="firstName"
          placeholderTextColor="gray"
          returnKeyType="done"
          onSubmitEditing={() => OnNext(lastNameRef)}
          onChangeText={text => setValue('firstName', text)}
          onFocus={() => onFocus('firstName')}
          onBlur={() => onFocus('')}
          style={focusVal === 'firstName' ? FocusStyle : null}
        />

        <TextInput
          value={watch('lastName')}
          ref={lastNameRef}
          placeholder="lastName"
          placeholderTextColor="gray"
          returnKeyType="done"
          onSubmitEditing={() => OnNext(emailRef)}
          onChangeText={text => setValue('lastName', text)}
          onFocus={() => onFocus('lastName')}
          onBlur={() => onFocus('')}
          style={focusVal === 'lastName' ? FocusStyle : null}
        />
        <TextInput
          value={watch('email')}
          ref={emailRef}
          placeholder="email"
          placeholderTextColor="gray"
          returnKeyType="done"
          onSubmitEditing={handleSubmit(onValid)}
          lastOne={true}
          onChangeText={text => setValue('email', text)}
          onFocus={() => onFocus('email')}
          onBlur={() => onFocus('')}
          style={focusVal === 'email' ? FocusStyle : null}
        />
        <AuthButton
          disabled={
            !watch('username') ||
            !watch('password') ||
            !watch('lastName') ||
            !watch('email') ||
            !watch('firstName')
          }
          loading={loading}
          Text="Join"
          onPress={handleSubmit(onValid)}></AuthButton>
      </AuthLayout>
    </Container>
  );
};
export default Join;
