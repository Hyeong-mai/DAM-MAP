import {gql, useQuery} from '@apollo/client';
import {width} from 'cli';
import React, {useCallback, useEffect} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled, {useTheme} from 'styled-components/native';

const ME_QUERY = gql`
  query Query {
    me {
      username
      avatar
    }
  }
`;
const SEE_PHOTO_QUERY = gql`
  query SeeLikedPhotos {
    seeAllPhoto {
      id
      isLiked
      file
    }
  }
`;

const ProfileUserContainer = styled.View`
  background-color: ${props => props.theme.colors.boxColor};
  flex: 1;
  align-items: center;
`;
const UserTitle = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
const SetTitle = styled.View`
  width: 100%;
  padding: 30px;
  align-items: flex-end;
  padding-top: 50px;
`;
const SetButton = styled.TouchableOpacity``;
const UserIcon = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.accent};
`;
const UserName = styled.Text`
  font-size: 24px;
  font-weight: 900;
  margin-top: 10px;
  color: ${props => props.theme.colors.fontColor};
`;
const UserList = styled.FlatList`
  flex: 1;
  padding: 20px;
  width: 100%;
`;
const ItemBox = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;
const ListTitle = styled.View`
  width: 100%;
  padding: 20px;
  align-items: flex-start;
  justify-content: center;
`;
const TItleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.fontColor};
`;
const Line = styled.View`
  padding: 3px;
  width: 100%;
  background-color: ${props => props.theme.colors.lineColor};
`;
const EmptyList = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const ItemTitle = styled.Text``;
const EmptyView = styled.View`
  padding: 20px;
  align-items: center;
  justify-content: center;
`;
const EmptyIcon = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${props => props.theme.colors.lightFontColor};
  margin-bottom: 15px;
`;
const EmptyText = styled.View`
  align-items: center;
  justify-content: center;
`;
const BigText = styled.Text`
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.fontColor};
`;
const SmallText = styled.Text`
  color: ${props => props.theme.colors.fontColor};
  font-size: 14px;
`;
const ProfileUser = ({navigation}) => {
  const {colors} = useTheme();
  const {data} = useQuery(ME_QUERY);
  const me = data?.me;
  const {data: seePhotoData, loading} = useQuery(SEE_PHOTO_QUERY);
  const filterData = seePhotoData?.seeAllPhoto?.filter(
    photo => photo.isLiked === true,
  );
  const renderItem = ({item}) => {
    return (
      <ItemBox
        onPress={() => {
          navigation.navigate('SlideDetail', {id: item.id});
        }}>
        <Image
          style={{width: 150, height: 150, borderRadius: 20}}
          source={{uri: item?.file}}
        />
      </ItemBox>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SetButton onPress={() => onNext()}>
          <Icon
            style={{fontSize: 18, color: colors.fontColor}}
            name="ellipsis-vertical-outline"
          />
        </SetButton>
      ),
    });
  }, [onNext, navigation, colors]);
  const onNext = useCallback(() => {
    navigation.navigate('Set');
  }, [navigation]);
  return (
    <ProfileUserContainer>
      <UserTitle>
        <UserIcon>
          <Image
            source={{uri: me?.avatar}}
            style={{width: '100%', height: '100%'}}
          />
        </UserIcon>
        <UserName>{me?.username}</UserName>
      </UserTitle>
      <Line />
      <ListTitle>
        <TItleText>내 포토리뷰</TItleText>
      </ListTitle>
      {!loading ? (
        filterData?.length > 0 ? (
          <UserList
            data={filterData}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            numColumns={2}
          />
        ) : (
          <EmptyList>
            <EmptyView>
              <EmptyIcon>
                <Icon name="alert-outline" color={colors.accent} size={30} />
              </EmptyIcon>
              <EmptyText>
                <BigText>아직 포토리뷰가 없습니다</BigText>
                <SmallText>포토리뷰를 남겨보세요</SmallText>
              </EmptyText>
            </EmptyView>
          </EmptyList>
        )
      ) : null}
    </ProfileUserContainer>
  );
};
export default ProfileUser;
