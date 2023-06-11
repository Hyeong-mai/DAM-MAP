import React from 'react';
import styled from 'styled-components/native';

const SearchAreaContainer = styled.View`
  background-color: tomato;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SearchArea = () => {
  return <SearchAreaContainer></SearchAreaContainer>;
};

export default SearchArea;
