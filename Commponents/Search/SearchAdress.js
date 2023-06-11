import Geocode from 'react-geocode';
import {REACT_APP_GOOGLE_API_KEY} from '@env';

Geocode.setApiKey(REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage('ko');
Geocode.setRegion('es');
Geocode.enableDebug();

const SearchAddress = async currentAddr => {
  try {
    const response = await Geocode.fromAddress(currentAddr);
    const {lat, lng} = response.results[0].geometry.location;
    return {lat, lng};
  } catch (error) {
    console.error('Geocoding 오류:', error);
    return {lat: 0, lng: 0};
  }
};
export default SearchAddress;
