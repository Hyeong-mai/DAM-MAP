import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Dimensions, ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {logUserOut} from '../../Apollo';
import MyMap from '../../Commponents/Map/MyMap';
import SearchBox from '../../Commponents/Map/SearchBox';
import SlidePanel from '../../Commponents/Map/SlidePanel';
import SearchIconConatiner from '../../Commponents/Search/SearchIcon';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {event} from 'react-native-reanimated';
import {useSharedValue} from 'react-native-reanimated';
import SearchAddress from '../../Commponents/Search/SearchAdress';
import {gql, useLazyQuery, useQuery} from '@apollo/client';
import ScreenLayout from '../../Commponents/ScreenLayout';

const {height} = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight(true);

const MapContainer = styled.View`
  flex: 1;
  background-color: black;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const SEARCH_QUERY = gql`
  query SearchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      address
      id
      isLiked
    }
  }
`;

const MapContent = ({navigation, route}) => {
  const param = route?.params;
  const [buttonVal, setButtonVal] = useState(false);
  const [listVal, setListVal] = useState(0);
  const [zoomValue, setZoomValue] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);
  const [gom, setGom] = useState({lat: 0, lng: 0});
  const [searchValue, setSearchValue] = useState(false);
  const [name, setName] = useState('');
  const [startQueryFn, {loading, data, called, refetch}] =
    useLazyQuery(SEARCH_QUERY);
  useEffect(() => {
    if (param?.keyword) {
      if (param?.form == 'area') {
        goSearchAddress(param?.keyword);
      } else if ('food') {
        goSearchFood(param?.keyword);
      }
    }
  }, [param?.keyword, goSearchAddress, goSearchFood, param?.form]);
  useEffect(() => {
    if (param?.name) {
      setName(param?.name);
    }
    if (name !== '') {
      startQuery(name);
    }
  }, [param?.name, name, startQuery]);

  const startQuery = useCallback(
    name => {
      startQueryFn({
        variables: {
          keyword: name,
        },
      });
    },
    [startQueryFn],
  );
  useEffect(() => {
    navigation.navigate('Search');
    setButtonVal(false);
  }, [buttonVal, navigation]);

  const errorAlert = () =>
    Alert.alert('검색어를 찾을 수 없습니다.', [
      {text: '확인', onPress: () => console.log('OK Pressed')},
    ]);
  const goSearchAddress = useCallback(async currentAddr => {
    if (currentAddr) {
      const {lat, lng} = await SearchAddress(currentAddr);
      if (lat === 0 && lng === 0) {
        errorAlert();
      } else {
        setGom({lat, lng});
      }
    }
  }, []);
  const goSearchFood = useCallback(keyword => {
    console.log(keyword);
    console.log('Search food');
  }, []);
  return (
    <MapContainer>
      <SearchBox
        statusBarHeight={statusBarHeight}
        setButtonVal={setButtonVal}
        setParentHeight={setParentHeight}
      />
      <MyMap
        name={name}
        setName={setName}
        zoomValue={zoomValue}
        data={data}
        gom={gom}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      <SearchIconConatiner
        parentHeight={parentHeight}
        statusBarHeight={statusBarHeight}
      />
      <SlidePanel
        data={data}
        name={name}
        setZoomValue={setZoomValue}
        setListVal={setListVal}
        navigation={navigation}
      />
    </MapContainer>
  );
};
export default MapContent;
