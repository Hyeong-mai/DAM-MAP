import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';
import {Alert, Dimensions, Image, View} from 'react-native';
import {color} from 'react-native-reanimated';
import {Modal} from 'react-native';
import FeedTool from '../../Commponents/Feed/FeedTool';
import {gql, useLazyQuery, useQuery} from '@apollo/client';
import ScreenLayout from '../../Commponents/ScreenLayout';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const SEE_ALL_QUERY = gql`
  query SeeAllPhoto {
    seeAllPhoto {
      caption
      address
      file
      id
      likes
      createAt
    }
  }
`;

const SmallTitle = styled.Text`
  font-size: 12px;
  color: ${props => props.theme.colors.accent};
  font-weight: 600;
`;

const ImageSlideWrap = styled.View`
  flex: 1;
  width: 100%;
  height: 75%;
  background-color: ${props => props.theme.colors.boxColor};
`;
const SlideBar = styled.View`
  width: 100%;
  padding: 10px 30px;
  align-items: flex-end;
`;
const SmallButton = styled.TouchableOpacity``;
const ImageSlide = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
const Item = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.accent};
`;
const ItemView = styled(LinearGradient).attrs({
  colors: ['rgba(0,0,0,0)', 'black'],
  start: {x: 0, y: 0},
  end: {x: 0, y: 0.85},
})`
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  align-items: flex-start;
  justify-content: flex-end;
`;
const ItemTitle = styled.Text`
  font-weight: 900;
  color: ${props => props.theme.colors.accent};
  font-size: 18px;
`;
const ItemAddress = styled.Text`
  font-weight: 900;
  color: gray;
  font-size: 14px;
  margin-bottom: 10px; ;
`;
const ItemBigTItle = styled.Text`
  color: white;
  font-weight: 900;
  font-size: 20px;
  margin-bottom: 20px;
`;
const TextWrap = styled.View`
  width: 50%;
  margin: 30px;
`;
const ModalWrap = styled.View`
  background-color: rgba(0, 0, 0, 0.6);
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;
const Popup = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.boxColor};
  padding: 20px;
  height: 25%;
  border-radius: 30px;
  align-items: center;
`;
const Select = styled.View`
  width: 90%;
  margin-bottom: 20px;
`;
const SelectButton = styled.TouchableOpacity`
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const SelectButtonTItle = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.colors.fontColor};
`;
const Complate = styled.View`
  width: 100%;
`;
const ComplateButton = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: black;
  border-radius: 15px;
`;
const ComplateButtonTItle = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: white;
`;
const LoadingView = styled.View`
  width: 100%;
  height: 100%;
  align-content: center;
  justify-content: center;
`;

const Feed = ({navigation}) => {
  const slideRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [recommend, setRecommend] = useState(true);
  const [photoData, setPhotoData] = useState([]);
  const {data, loading} = useQuery(SEE_ALL_QUERY);

  useEffect(() => {
    let PAGES;
    if (recommend) {
      PAGES = data?.seeAllPhoto.slice().sort((a, b) => b.likes - a.likes);
    } else {
      PAGES = data?.seeAllPhoto.slice().sort((a, b) => b.createAt - a.createAt);
    }
    setPhotoData(PAGES);
  }, [setPhotoData, data, recommend]);
  const renderItem = ({item}) => {
    return (
      <Item
        onPress={() => {
          navigation.navigate('SlideDetail', {id: item.id});
        }}>
        {loading ? (
          <LoadingView>
            <ActivityIndicator size="large" />
          </LoadingView>
        ) : (
          <Image
            source={{uri: item.file}}
            style={{width: '100%', height: '100%'}}
          />
        )}
        <ItemView>
          <TextWrap>
            <ItemAddress>{item.address}</ItemAddress>
            <ItemBigTItle>오늘 라연이랑 뭘먹을까 고민중이다.</ItemBigTItle>
            <ItemTitle>{item.caption}</ItemTitle>
          </TextWrap>
        </ItemView>
      </Item>
    );
  };

  return (
    <FeedTool>
      {/* <ScreenLayout loading={loading}> */}
      <ImageSlideWrap>
        <SlideBar>
          <SmallButton onPress={() => setModalVisible(true)}>
            <SmallTitle>{recommend ? '추천순' : '업데이트순'} ⌵</SmallTitle>
          </SmallButton>
        </SlideBar>
        <ImageSlide>
          {data && photoData ? (
            <Carousel
              ref={slideRef}
              data={photoData}
              renderItem={renderItem}
              sliderWidth={screenWidth}
              itemWidth={screenWidth - 60}
              keyExtractor={item => item.id}
            />
          ) : (
            <LoadingView>
              <ActivityIndicator size="large" />
            </LoadingView>
          )}
        </ImageSlide>
      </ImageSlideWrap>
      {/* </ScreenLayout> */}
      <Modal useNativeDriver={true} transparent={true} visible={modalVisible}>
        <ModalWrap>
          <Popup>
            <Select>
              <SelectButton onPress={() => setRecommend(true)}>
                <SelectButtonTItle
                  style={
                    recommend
                      ? {
                          color: 'tomato',
                          fontWeight: 'bold',
                          fontSize: 16,
                        }
                      : null
                  }>
                  추천순
                </SelectButtonTItle>
              </SelectButton>
              <SelectButton onPress={() => setRecommend(false)}>
                <SelectButtonTItle
                  style={
                    recommend
                      ? null
                      : {color: 'tomato', fontWeight: 'bold', fontSize: 16}
                  }>
                  업데이트순
                </SelectButtonTItle>
              </SelectButton>
            </Select>
            <Complate>
              <ComplateButton onPress={() => setModalVisible(false)}>
                <ComplateButtonTItle>확인</ComplateButtonTItle>
              </ComplateButton>
            </Complate>
          </Popup>
        </ModalWrap>
      </Modal>
    </FeedTool>
    // <FeedContianer>
    //   <FeedTitle>
    //     <SmallTitle>News</SmallTitle>
    //     <BigTitle>새로 생긴 뉴스 {'\n'} DRIP이 골랐다 ™ </BigTitle>
    //   </FeedTitle>

    // </FeedContianer>
  );
};
export default Feed;
