import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Animated} from 'react-native';
import styled from 'styled-components/native';

const MapHeader = styled.View`
  position: absolute;
  z-index: 1;
  width: 100%;
  padding: 0px 20px;
  margin-top: ${props => props.statusBarHeight}px;
`;
const SearchInput = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.boxColor};
  opacity: 0.9;
  padding: 17px 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  box-shadow: 0px 0px 5px rgba(1, 1, 1, 0.1);
`;

const InputTitle = styled.Text`
  color: ${props => props.theme.colors.fontColor};
  font-weight: 800;
  font-size: 17px;
`;

const SearchBox = ({setButtonVal, statusBarHeight, setParentHeight}) => {
  const boxRef = useRef();
  const goSearch = () => {
    setButtonVal(true);
  };
  return (
    <MapHeader
      statusBarHeight={statusBarHeight}
      ref={boxRef}
      onLayout={() => {
        boxRef.current.measure((x, y, width, height, pageX, pageY) => {
          setParentHeight(height);
        });
      }}>
      <SearchInput activeOpacity={1} onPress={() => goSearch()}>
        <InputTitle>검색어를 입력해주세요.</InputTitle>
      </SearchInput>
    </MapHeader>
  );
};

export default SearchBox;
