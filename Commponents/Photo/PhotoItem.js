import {gql, useQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, useWindowDimensions} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';
import styled from 'styled-components/native';
import ScreenLayout from '../ScreenLayout';

const SEE_PHOTO = gql`
  query SeePhoto($seePhotoId: Int!) {
    seePhoto(id: $seePhotoId) {
      caption
      address
      file
      id
    }
  }
`;

const PhotoItemCon = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.bgColor};
`;
const ImageList = styled.View`
  width: 100%;
  height: 400px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.boxColor};
`;
const ImageTitle = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.boxColor};
`;
const ImageLinkWrap = styled.View`
  width: 100%;
`;
const Link = styled.Text`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.accent};
`;
const ImageTitlekWrap = styled.View`
  width: 100%;
  padding: 10px 0px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: ${props => props.theme.colors.fontColor};
`;

const Plus = styled.TouchableOpacity``;
const PlusText = styled.Text`
  font-size: 16px;
  font-weight: 800;
  color: ${props => props.theme.colors.fontColor};
`;

const PhotoItem = ({id}) => {
  const {width, height} = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState(height - 450);
  const navigation = useNavigation();
  const {data, loading} = useQuery(SEE_PHOTO, {
    variables: {
      seePhotoId: id,
    },
  });
  const photo = data?.seePhoto;

  const onPress = () => {
    navigation.navigate('SlideDetail', {id: photo.id});
  };
  return (
    <PhotoItemCon>
      <ScreenLayout loading={loading}>
        <ImageList>
          <Image
            resizeMode="cover"
            style={{
              width,
              height: 400,
            }}
            source={{uri: photo?.file}}
          />
        </ImageList>
        <ImageTitle>
          <ImageLinkWrap>
            <Link>Link</Link>
          </ImageLinkWrap>
          <ImageTitlekWrap>
            <Title>{photo?.caption}</Title>
            <Plus onPress={() => onPress()}>
              <PlusText>Plus</PlusText>
            </Plus>
          </ImageTitlekWrap>
        </ImageTitle>
      </ScreenLayout>
    </PhotoItemCon>
  );
};

export default PhotoItem;
