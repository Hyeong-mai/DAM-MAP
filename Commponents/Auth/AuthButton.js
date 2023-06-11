import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.accent};
  padding: 15px 10px;
  border-radius: 20px;
  width: 100%;
  opacity: ${props => (props.disabled ? '0.5' : '1')};
`;
const ButtonText = styled.Text`
  color: white;
  font-weight: 600;
  text-align: center;
`;

const AuthButton = ({disabled, onPress, Text, loading}) => {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{Text}</ButtonText>
      )}
    </Button>
  );
};
export default AuthButton;
