import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  width: 100%;

  background-color: black;
  align-items: center;
  justify-content: center;
`;

const ScreenLayout = ({loading, children}) => {
  return <Container>{loading ? <ActivityIndicator /> : children}</Container>;
};
export default ScreenLayout;
