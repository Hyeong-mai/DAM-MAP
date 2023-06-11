import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.boxColor};
  align-items: center;
  justify-content: center;
`;
const Logo = styled.Text`
  font-size: 51px;
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
  margin-bottom: 10px;
`;
const LoginButton = styled.TouchableOpacity`
  padding: 10px 80px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.accent};
  margin-bottom: 15px;
`;
const JoinButton = styled.TouchableOpacity`
  border-radius: 5px;
  margin-bottom: 20px;
`;
const Title = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const JoinTitle = styled.Text`
  color: ${props => props.theme.colors.accent};
  font-size: 13px;
`;
const ButtonWrap = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Welcome = ({navigation}) => {
  const gotoLogin = () => {
    // navigation.navigate('AuthScreen', {page: 'login'});
    navigation.navigate('Login');
  };
  const gotoJoin = () => {
    // navigation.navigate('AuthScreen', {page: 'join'});
    navigation.navigate('Join');
  };

  return (
    <Container>
      <Logo>
        DRIP <Icon name="water" />
      </Logo>
      <ButtonWrap>
        <LoginButton onPress={() => gotoLogin()}>
          <Title>Login</Title>
        </LoginButton>
        <JoinButton onPress={() => gotoJoin()}>
          <JoinTitle>Go to Create Account</JoinTitle>
        </JoinButton>
      </ButtonWrap>
    </Container>
  );
};
export default Welcome;
