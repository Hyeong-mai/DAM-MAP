import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image, ScrollView, useWindowDimensions} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import {gql, useMutation, useQuery} from '@apollo/client';
import ScreenLayout from '../../Commponents/ScreenLayout';

const SEE_PHOTO = gql`
  query SeePhoto($seePhotoId: Int!) {
    seePhoto(id: $seePhotoId) {
      caption
      address
      file
      isLiked
      id
    }
  }
`;

const LIKE_MUTATION = gql`
  mutation toggleLike($toggleLikeId: Int!) {
    toggleLike(id: $toggleLikeId) {
      ok
      error
    }
  }
`;

const ContainerWrap = styled.View`
  flex: 1;
`;
const SlideDetailContainer = styled.ScrollView`
  background-color: ${props => props.theme.colors.boxColor};
  flex: 1;
`;
const Title = styled.View`
  width: 100%;
  padding: 20px;
`;
const BigTitle = styled.Text`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.fontColor};
`;
const SubTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  color: ${props => props.theme.colors.fontColor};
`;
const SmallTitle = styled.Text`
  color: ${props => props.theme.colors.fontColor};
`;
const MapButton = styled.TouchableOpacity``;
const MapButtonTitle = styled.Text`
  color: purple;
  text-decoration: underline purple;
  color: ${props => props.theme.colors.accent};
`;
const ImageSlide = styled.View`
  width: 100%;
  background-color: black;
`;
const Contain = styled.View`
  width: 100%;
  padding: 20px;
`;
const Review = styled.View`
  width: 100%;
  padding: 20px;
  height: 120px;
  flex-direction: row;
  justify-content: space-between;
  overflow: visible;
`;
const DetailInfo = styled.View`
  width: 100%;
  height: 400px;
  background-color: ${props => props.theme.colors.accent};
  z-index: -1;
  padding: 50px 30px;
`;
const ContainTitle = styled.View`
  font-size: 32px;
  font-weight: 800;
  padding: 7px;
  margin-bottom: 30px;
`;
const TitleStyle = styled.View`
  width: 40%;
  height: 70px;
  position: absolute;
  background-color: ${props => props.theme.colors.fontColor};
  border-radius: 40px;
  opacity: 0.1;
`;
const ContainText = styled.Text`
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 10px;
  padding-left: 20px;
  color: ${props => props.theme.colors.accent};
`;
const ContainDetail = styled.Text`
  font-size: 15px;
  color: ${props => props.theme.colors.fontColor}; ;
`;
const AddButton = styled.TouchableOpacity``;
const AddButtonText = styled.Text`
  text-align: center;
  text-decoration: underline rgba(0, 0, 0, 0.3);
  font-size: 16px;
  font-weight: 700;
  color: ${props => props.theme.colors.fontColor};
  letter-spacing: 2px;
`;
const ImageList = styled.View`
  width: 75%;
  flex-direction: row;
  justify-content: space-between;
`;
const DetailInfoText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 10px;
`;
const BookmarkButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5);
  background-color: ${props => props.theme.colors.boxColor};
  position: absolute;
  bottom: 50px;
  right: 20px;
`;
const ImageWrap = styled.View`
  width: 80px;
  height: 120px;
  background-color: ${props => props.theme.colors.fontColor};
  align-items: center;
  justify-content: center;
`;
const EmptyText = styled.Text`
  color: black;
  font-weight: 900;
`;
const ButtonIcon = styled.Text``;
const BackButton = styled.TouchableOpacity``;
const SlideDetail = ({route, navigation}) => {
  const {width, height} = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  const {data, loading} = useQuery(SEE_PHOTO, {
    variables: {
      seePhotoId: route?.params?.id,
    },
  });
  const photo = data?.seePhoto;
  const updateToggleLike = (cache, result) => {
    const {
      data: {
        toggleLike: {ok},
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${photo.id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev) {
            console.log(prev);
            return !prev;
          },
          likes(prev) {
            if (photo.isLiked) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleLikeMutation] = useMutation(LIKE_MUTATION, {
    variables: {
      toggleLikeId: photo?.id,
    },
    update: updateToggleLike,
  });

  useEffect(() => {
    {
      loading
        ? null
        : Image.getSize(photo?.file, (width, height) => {
            if (width > 1000 && height > 1000) {
              setImageHeight(height / 8);
            } else {
              setImageHeight(height / 3);
            }
          });
    }
  }, [photo?.file, loading]);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton onPress={() => navigation.goBack()}>
          <Icon name="close" size={24} color={'white'} />
        </BackButton>
      ),
    });
  }, [navigation]);
  return (
    <ContainerWrap>
      <SlideDetailContainer>
        <Title>
          <BigTitle>{photo?.caption}</BigTitle>
          <SubTitle>
            <SmallTitle>{photo?.address}</SmallTitle>
            <MapButton>
              <MapButtonTitle>map</MapButtonTitle>
            </MapButton>
          </SubTitle>
        </Title>
        <ImageSlide>
          {photo?.file ? (
            <Image
              resizeMode="cover"
              style={{
                width,
                height: imageHeight,
              }}
              source={{uri: photo?.file}}
            />
          ) : null}
        </ImageSlide>
        <Contain>
          <ContainTitle>
            <TitleStyle></TitleStyle>
            <ContainText>{photo?.caption}</ContainText>
          </ContainTitle>
          <ContainDetail>
            북부 스타일 베트남식이다. 일반적으로 우리가 아는 베트남 음식보다
            간이 세지 않다. 북쪽으로 갈수록 음식은 슴슴해진 다. 쌀국수의 맑은
            육수 호불호가 갈릴 수 있다. 용산의 효뜨 이다. 정자에 2호점을
            오픈했다.
            {`\n`}
            {`\n`}
            외관만 보면 베트남이다. 코로나 시대 여행 고픈 사람들의 마 음을
            달래준다. 베트남 맥주 시켜 분위기 내본다. 미식 3대장 나라
            베트남이다.음식의 종류가 다양하다. 메뉴판이 친절하 다. 음식 설명을
            자세히 적었다.
            {`\n`}
            {`\n`}
            효뜨의 쌀국수는 유명하다. 고기를 샤브샤브 처럼 익혀 먹을 수있게
            나온다.육즙을 살려서 먹을 수 있다. 특히 개인적으 로는 얼큰 쌀국수가
            취향이다. 중간 중간 칼칼한 맛이 튀어나 온다. 칼칼한 맛이 매력적이다.
            여기에 고수를 추가해서 먹으 면 다른 향이 나서 더 풍미가 좋다.
            닭튀김은 목살 부분을 사 용했다. 코코넛 기름에 튀겨 더욱 고소하다.
            뜨거운 웍으로 바 로해 나온 펏싸오다. 스트릿 푸드보다 깔끔한 맛이다.
            음식은 여행의 추억이다.
          </ContainDetail>
        </Contain>
        <Review>
          <AddButton>
            <AddButtonText>REVIEW{`\n`}BUTTON</AddButtonText>
          </AddButton>
          <ImageList>
            <ImageWrap>
              <EmptyText>Empty</EmptyText>
            </ImageWrap>
            <ImageWrap>
              <EmptyText>Empty</EmptyText>
            </ImageWrap>
            <ImageWrap>
              <EmptyText>Empty</EmptyText>
            </ImageWrap>
          </ImageList>
        </Review>
        <DetailInfo>
          <DetailInfoText>{photo?.address}</DetailInfoText>
          <DetailInfoText>Menu</DetailInfoText>
          <DetailInfoText>Opening Hours</DetailInfoText>
          <DetailInfoText>Phone Number</DetailInfoText>
        </DetailInfo>
      </SlideDetailContainer>
      <BookmarkButton onPress={toggleLikeMutation}>
        <ButtonIcon>
          <Icon
            name={photo?.isLiked ? 'heart' : 'heart-outline'}
            color={'#FF8F4E'}
            size={32}
          />
        </ButtonIcon>
      </BookmarkButton>
    </ContainerWrap>
  );
};

export default SlideDetail;
