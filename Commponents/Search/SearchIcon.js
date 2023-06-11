import React from 'react';
import styled from 'styled-components/native';
import SearchAdress from './SearchAdress';

const Title = styled.Text`
  color: ${props => props.theme.colors.fontColor};
  font-weight: 400;
  font-size: 14px;
`;
const Logo = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.accent};
  border-radius: 20px;
  opacity: 0.9;
  padding: 10px;
  margin-right: 10px;
  box-shadow: 0px 0px 5px rgba(1, 1, 1, 0.1);
`;
const Icon = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.boxColor};
  opacity: 0.9;
  border-radius: 20px;
  padding: 10px;
  margin-left: 16px;
  box-shadow: 0px 0px 5px rgba(1, 1, 1, 0.1);
`;
const IconWrap = styled.View`
  flex-direction: row;
`;
const Scroll = styled.ScrollView`
  width: 100%;
`;
const SearchIcon = styled.View`
  padding: 0px 5px;
  flex-direction: row;
  width: 90%;
  position: absolute;
  z-index: 0;
  margin-top: ${props => props.statusBarHeight + props.parentHeight}px;
  opacity: 0.9;
`;
const SearchIconConatiner = ({statusBarHeight, parentHeight}) => {
  return (
    <SearchIcon statusBarHeight={statusBarHeight} parentHeight={parentHeight}>
      <Logo>
        <Title style={{color: 'white'}}>DRIP</Title>
      </Logo>
      <Scroll horizontal={true} showsHorizontalScrollIndicator={false}>
        <IconWrap>
          <Icon activeOpacity={0.6}>
            <Title>인기 명소</Title>
          </Icon>
          <Icon activeOpacity={0.6}>
            <Title>카페/디저트</Title>
          </Icon>
          <Icon activeOpacity={0.6}>
            <Title>조용한 곳</Title>
          </Icon>
          <Icon activeOpacity={0.6}>
            <Title>드라이브 하기 좋은 곳</Title>
          </Icon>
        </IconWrap>
      </Scroll>
    </SearchIcon>
  );
};

export default SearchIconConatiner;
