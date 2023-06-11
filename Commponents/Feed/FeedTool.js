import React from 'react';
import styled from 'styled-components/native';

const FeedToolCon = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.boxColor};
  align-items: center;
`;

const SmallTitle = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
  opacity: 0.5;
`;

const BigTitle = styled.Text`
  font-size: 30px;
  color: ${props => props.theme.colors.fontColor};
  font-weight: 800;
`;

const FeedTitle = styled.View`
  padding: 0px 30px;
  width: 100%;
  height: 25%;
  justify-content: flex-end;
`;
const Logo = styled.Text`
  font-size: 30px;
  color: ${props => props.theme.colors.accent};
  font-weight: 800;
`;

const FeedTool = ({STitle, BTitle, children}) => {
  return (
    <FeedToolCon>
      <FeedTitle>
        <SmallTitle>news</SmallTitle>
        <BigTitle>
          {`새로 생긴 맛집 \n`} <Logo>DRIP</Logo>
          {`이 골랐다`}
        </BigTitle>
      </FeedTitle>
      {children}
    </FeedToolCon>
  );
};

export default FeedTool;
