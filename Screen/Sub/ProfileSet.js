import React from 'react';
import {ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {logUserOut} from '../../Apollo';

const ProfileSetContainer = styled.View`
  background-color: rgba(0, 0, 0, 0.01);
  align-items: center;
  flex: 1;
`;
const SetList = styled.View`
  padding: 30px;
  width: 100%;
  background-color: ${props => props.theme.colors.boxColor};
  margin-bottom: 5px;
`;
const Scroll = styled.ScrollView`
  width: 100%;
  flex: 1;
`;
const SmallTitle = styled.View`
  width: 100%;
`;
const SmallText = styled.Text`
  color: ${props => props.theme.colors.fontColor};
  font-weight: 900;
`;
const SetTitle = styled.View`
  width: 100%;
  padding-top: 25px;
`;
const SetText = styled.Text`
  color: ${props => props.theme.colors.fontColor};
  font-weight: 500;
  font-size: 18px;
`;
const LogOutList = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.boxColor};
`;
const LogOutButton = styled.TouchableOpacity`
  width: 100%;
  padding: 30px;
  align-items: center;
  justify-content: center;
`;
const LogOutButtonText = styled.Text`
  color: ${props => props.theme.colors.fontColor};
`;
const ProfileSet = () => {
  return (
    <ProfileSetContainer>
      <Scroll>
        <SetList>
          <SmallTitle>
            <SmallText>계정</SmallText>
          </SmallTitle>
          <SetTitle>
            <SetText>계정 관리</SetText>
          </SetTitle>
        </SetList>
        <SetList>
          <SmallTitle>
            <SmallText>알림</SmallText>
          </SmallTitle>
          <SetTitle>
            <SetText>알림 설정</SetText>
          </SetTitle>
        </SetList>
        <SetList>
          <SmallTitle>
            <SmallText>알림</SmallText>
          </SmallTitle>
          <SetTitle>
            <SetText>공지사항</SetText>
          </SetTitle>
          <SetTitle>
            <SetText>자주 묻는 질문</SetText>
          </SetTitle>
          <SetTitle>
            <SetText>의견 보내기</SetText>
          </SetTitle>
        </SetList>
        <SetList>
          <SmallTitle>
            <SmallText>약관 및 정책</SmallText>
          </SmallTitle>
          <SetTitle>
            <SetText>서비스 이용약관</SetText>
          </SetTitle>
          <SetTitle>
            <SetText>개인정보 처리 방침</SetText>
          </SetTitle>
          <SetTitle>
            <SetText>위치기반 서비스 이용약관</SetText>
          </SetTitle>
        </SetList>
        <LogOutList>
          <LogOutButton onPress={() => logUserOut()}>
            <LogOutButtonText>로그아웃</LogOutButtonText>
          </LogOutButton>
        </LogOutList>
      </Scroll>
    </ProfileSetContainer>
  );
};
export default ProfileSet;
