import {useReactiveVar} from '@apollo/client';
import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import FeedTool from '../../Commponents/Feed/FeedTool';

const CheckBefore = styled.View`
  background-color: ${props => props.theme.colors.boxColor};
  width: 100%;
  padding: 20px;
`;
const CheckAfter = styled.View`
  background-color: rgba(0, 0, 0, 0.05);
  padding: 20px;
  width: 100%;
`;
const CheckTitle = styled.View`
  width: 100%;
  margin-top: 20px;
`;
const CheckText = styled.Text`
  font-size: 17px;
  font-weight: 800;
  color: ${props => props.theme.colors.lightFontColor};
`;
const NotiCon = styled.View`
  margin-top: 15px;
  padding: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const NotiIcon = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${props => props.theme.colors.accent};
  border-radius: 50px;
`;
const NotiTitle = styled.Text`
  width: 180px;
  font-weight: 600;
  color: ${props => props.theme.colors.fontColor};
`;
const NotiDate = styled.Text`
  color: ${props => props.theme.colors.fontColor};
`;
const Notification = ({navigation}) => {
  return (
    <FeedTool STitle={'알림'} BTitle={'누구보다 빠르게 \n 확인한다.'}>
      <CheckBefore>
        <CheckTitle>
          <CheckText>확인 끝</CheckText>
        </CheckTitle>
      </CheckBefore>
      <CheckAfter>
        <CheckTitle>
          <CheckText>확인 전</CheckText>
        </CheckTitle>
        <NotiCon>
          <NotiIcon></NotiIcon>
          <NotiTitle numberOfLines={2}>
            마너우ㅏ머누아ㅓ문아ㅓ무나어ㅜㅁ나ㅓ우마ㅓ누아
          </NotiTitle>
          <NotiDate> 23.1.17</NotiDate>
        </NotiCon>
        <NotiCon>
          <NotiIcon></NotiIcon>
          <NotiTitle numberOfLines={2}>
            마너우ㅏ머누아ㅓ문아ㅓ무나어ㅜㅁ나ㅓ우마ㅓ누아
          </NotiTitle>
          <NotiDate> 23.1.17</NotiDate>
        </NotiCon>
        <NotiCon>
          <NotiIcon></NotiIcon>
          <NotiTitle numberOfLines={2}>
            마너우ㅏ머누아ㅓ문아ㅓ무나어ㅜㅁ나ㅓ우마ㅓ누아
          </NotiTitle>
          <NotiDate> 23.1.17</NotiDate>
        </NotiCon>
      </CheckAfter>
    </FeedTool>
  );
};
export default Notification;
