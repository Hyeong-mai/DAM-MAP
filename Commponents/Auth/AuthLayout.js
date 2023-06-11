import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import styled from 'styled-components/native';
import Dismisskeyboard from '../DismissKeyboard';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 25px;
  width: 100%;
`;

const AuthLayout = ({children}) => {
  return (
    <Dismisskeyboard>
      <Container>
        <KeyboardAvoidingView
          style={{width: '100%'}}
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
          disabled={Platform.OS === 'web'}>
          {children}
        </KeyboardAvoidingView>
      </Container>
    </Dismisskeyboard>
  );
};
export default AuthLayout;
