import styled, {useTheme} from 'styled-components/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapSunny from '../../MapStyle/MspStyleSunny';
import MapDark from '../../MapStyle/MapStyleDark';
import Geocoder from 'react-native-geocoding';
import {REACT_APP_GOOGLE_API_KEY} from '@env';
import {gql, useQuery} from '@apollo/client';
import SearchAddress from '../Search/SearchAdress';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

Geocoder.init(REACT_APP_GOOGLE_API_KEY);

const width = Dimensions.get('window').width;
const requestPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      return await Geolocation.requestAuthorization('always');
    }
  } catch (e) {
    console.log(e);
  }
};
const Test = styled.View`
  flex: 1;
`;
const TestText = styled.Text`
  flex: 1;
`;

const styles = StyleSheet.create({
  map: {
    width: width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStyle = [
  {
    featureType: 'allr',
    elementType: 'labels',
    stylers: [{visibility: 'off'}],
  },
];

const MyMap = ({gom, setName, data}) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme() === 'dark';
  const {colors} = useTheme();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [toLocation, setToLocation] = useState({});
  const [markers, setMarkers] = useState([]);
  const [markerClicked, setMarkerClicked] = useState(false);
  const [makerId, setMarkerId] = useState();
  const [isSearching, setIsSearching] = useState(false); // 검색 중 상태를 나타내기 위한 상태 추가
  const [searchError, setSearchError] = useState(false);
  const mapRef = useRef();

  const searchAgain = useCallback(async (latitude, longitude) => {
    try {
      // 새로운 지역 좌표를 기반으로 마커를 검색합니다
      // const searchResult = await performSearch(latitude, longitude);

      // // 검색 결과를 마커로 업데이트합니다
      // const markerData = await Promise.all(
      //   searchResult.searchPhotos.map(async photo => {
      //     const {lat, lng} = await SearchAddress(photo?.address);
      //     return {id: photo.id, lat, lng, like: photo.isLiked};
      //   }),
      // );
      // setMarkers(markerData);

      // 검색 중 상태와 검색 오류 상태를 초기화합니다
      setIsSearching(false);
      setSearchError(false);
    } catch (error) {
      console.error(error);
      // 검색 오류를 처리합니다
      setIsSearching(false);
      setSearchError(true);
    }
  }, []);
  useEffect(() => {
    // 동이 변경되었을 때 검색을 수행합니다
    if (toLocation && toLocation.lat && toLocation.log) {
      searchAgain(toLocation.lat, toLocation.log);
    }
  }, [toLocation, searchAgain]);
  useEffect(() => {
    requestPermission().then(result => {
      if (result === 'granted') {
        Geolocation.getCurrentPosition(
          pos => {
            setLatitude(pos?.coords?.latitude);
            setLongitude(pos?.coords?.longitude);
            Geocoder.from(pos?.coords?.latitude, pos?.coords?.longitude)
              .then(json => {
                const addressComponent =
                  json?.results[0]?.address_components[1].long_name;
                setName(addressComponent);
              })
              .catch(error => console.warn(error));
          },
          error => {
            console.log(error);
          },
          {
            enableHighAccuracy: true,
            timeout: 3600,
            maximumAge: 3600,
          },
        );
      }
    });
  }, [setName]);
  useEffect(() => {
    const fetchMarkerData = async () => {
      const markerData = await Promise.all(
        data.searchPhotos.map(async photo => {
          const {lat, lng} = await SearchAddress(photo?.address);
          return {id: photo.id, lat, lng, like: photo.isLiked};
        }),
      );
      setMarkers(markerData);
    };

    if (data?.searchPhotos) {
      fetchMarkerData();
    }
  }, [data?.searchPhotos]);
  useEffect(() => {
    animateMap(gom);
  }, [animateMap, gom, markers]);
  const animateMap = useCallback(
    gom => {
      if (mapRef.current && markers.length > 0) {
        const sumLatitude = markers.reduce(
          (sum, marker) => sum + marker.lat,
          0,
        );
        const sumLongitude = markers.reduce(
          (sum, marker) => sum + marker.lng,
          0,
        );
        const avgLatitude = sumLatitude / markers.length;
        const avgLongitude = sumLongitude / markers.length;
        mapRef?.current?.animateToRegion({
          latitude: avgLatitude,
          longitude: avgLongitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      } else {
        mapRef?.current?.animateToRegion(
          {
            latitude: gom.lat,
            longitude: gom.lng,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          },
          500,
        );
      }

      // }
    },
    [markers],
  );

  if (!longitude && !latitude) {
    return (
      <Test>
        <TestText>Splash Screen</TestText>
      </Test>
    );
  }
  const onRegionChangeComplete = data => {
    if (markerClicked) {
      handleAnimateComplete();
      setMarkerClicked(false);
    }
    setToLocation({lat: data.latitude, log: data.longitude});

    //setMarkers([]);
    setIsSearching(true);
    setSearchError(false);

    // 검색 함수를 호출합니다
    searchAgain(data.latitude, data.longitude);
  };

  const handleMarkerPress = async marker => {
    const region = {
      latitude: marker.lat,
      longitude: marker.lng,
      latitudeDelta: 0.009,
      longitudeDelta:
        0.009 *
        (Dimensions.get('window').width / Dimensions.get('window').height),
    };
    setMarkerId(marker.id);
    setMarkerClicked(true);
    await animateToRegion(region);
  };

  const handleAnimateComplete = () => {
    navigation.navigate('SlideDetail', {id: makerId});
  };

  const animateToRegion = region => {
    return new Promise(resolve => {
      mapRef.current.animateToRegion(region, 300);
      setTimeout(() => resolve(), 500); // 1초 후에 resolve() 호출
    });
  };
  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      customMapStyle={colorScheme ? MapDark : MapSunny}
      style={styles.map}
      onRegionChangeComplete={data => onRegionChangeComplete(data)}
      initialRegion={{
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
      minZoomLevel={5} // default => 0
      maxZoomLevel={16.7}>
      {markers.map(marker => (
        <Marker
          key={marker.id}
          coordinate={{latitude: marker.lat, longitude: marker.lng}}
          onPress={() => handleMarkerPress(marker)}>
          {marker.like ? (
            <Icon name={'heart-circle-sharp'} color={colors.accent} size={30} />
          ) : (
            <Icon name={'location-sharp'} color={colors.accent} size={30} />
          )}
        </Marker>
      ))}
      {isSearching && <Text style={styles.searchText}>검색 중...</Text>}
      {searchError && <Text style={styles.errorText}>검색 오류</Text>}
    </MapView>
  );
};

export default MyMap;
