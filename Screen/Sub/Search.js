import React, {useCallback, useEffect, useRef, useState} from 'react';
import styled, {css, useTheme} from 'styled-components/native';
import Dismisskeyboard from '../../Commponents/DismissKeyboard';
import SearchButton from '../../Commponents/Search/SeachButton';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {REACT_APP_GOOGLE_API_KEY} from '@env';
import {View} from 'react-native';

const SearchContianer = styled.View`
  background-color: ${props => props.theme.colors.boxColor};
  flex: 1;
`;

const SearchHeader = styled.View`
  width: 100%;
  padding: 0px 10px;
  flex: 1;
`;

const ButtonWrap = styled.View``;
const SearchInputWrap = styled.View`
  padding: 10px;
  flex: 1;
`;
const NotFoundView = styled.View`
  width: 100%;
  flex: 0.4;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;
const NotFoundTextWrap = styled.View`
  width: 100%;
  padding: 70px;
  align-items: center;
  justify-self: centers;
`;
const Keyword = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: ${props => props.theme.colors.accent};
`;
const BoldText = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
  color: ${props => props.theme.colors.fontColor};
`;
const ThinText = styled.Text`
  font-size: 12px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.fontColor};
`;
const FoodInput = styled.TextInput`
  width: 100%;
  height: 55px;
  background-color: ${props => props.theme.colors.boxColor};
  border-radius: 20px;
  padding: 12px 20px;
  font-size: 18px;
  border-width: 1px;
  border-color: ${props =>
    props.focusVal ? props.theme.colors.accent : props.theme.colors.fontColor};
  color: ${props => props.theme.colors.fontColor};
`;
const Search = ({navigation}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    search: {
      // container 감싸고 있는 컴포넌트
      // container: {
      //   flex: 1,
      // },
      // input을 감싸는 컴포넌트
      textInputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      // input창
      textInput: {},
      // 검색결과 리스트 컴포넌트
      listView: {
        paddingHorizontal: 0,
        elevation: 8,
        backgroundColor: colors.boxColor,
      },
      // 검색결과 행
      row: {
        paddingVertical: 20,
        backgroundColor: colors.boxColor,
      },
      // 검색결과 divided line
      separator: {
        height: 0.5,
        backgroundColor: colors.fontColor,
        opacity: 0.5,
      },
      // 검색결과 text
      description: {
        fontSize: 15,
        color: colors.fontColor,
      },
      poweredContainer: {
        backgroundColor: colors.boxColor,
      },
    },
  });
  const ref = useRef();
  const [focusVal, setFocusVal] = useState(false);
  const [boxKeyword, setBoxKeyword] = useState('지역');
  const {register, setValue} = useForm();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    register('keyword', {
      required: true,
    });
  }, [register]);
  const onValid = (data, name) => {
    const keyword = data;
    if (boxKeyword === '지역') {
      navigation.navigate('MapContent', {
        name: name,
        keyword,
        form: 'area',
      });
    } else {
      navigation.navigate('MapContent', {
        name: name,
        keyword,
        form: 'food',
      });
    }
  };

  const handleTextChange = text => {
    setSearchText(text);
  };
  const onBlur = () => {
    setFocusVal(false);
  };
  const onFocus = () => {
    setFocusVal(true);
  };

  const NoResults = () => (
    <NotFoundTextWrap>
      <Keyword>'{searchText}'</Keyword>
      <BoldText>에 대한 검색결과가 없어요</BoldText>
      <ThinText>다른 검색어를 다시 입력해 주세요.</ThinText>
    </NotFoundTextWrap>
  );
  return (
    <Dismisskeyboard>
      <SearchContianer>
        <SearchHeader>
          <ButtonWrap>
            <SearchButton
              setFocusVal={setFocusVal}
              setBoxKeyword={setBoxKeyword}
              setValue={setValue}
            />
          </ButtonWrap>
          <SearchInputWrap>
            {boxKeyword === '지역' ? (
              <GooglePlacesAutocomplete
                ref={ref}
                autoFocus={true}
                placeholder="주변 역을 검색해 주세요."
                onPress={(data, details = null) => {
                  onValid(
                    details.description,
                    details.structured_formatting.main_text,
                  );
                }}
                textInputProps={{
                  onChangeText: text => {
                    handleTextChange(text);
                  },
                  onBlur: () => {
                    onBlur();
                  },
                  onFocus: () => {
                    onFocus();
                  },
                  style: {
                    width: '100%',
                    height: 55,
                    backgroundColor: colors.boxColor,
                    borderRadius: 20,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: focusVal ? colors.accent : colors.fontColor,
                    color: colors.fontColor,
                  },
                }}
                listEmptyComponent={NoResults}
                onFail={error => console.error(error)}
                enablePoweredByContainer={false}
                keepResultsAfterBlur={true}
                styles={styles.search}
                query={{
                  key: REACT_APP_GOOGLE_API_KEY,
                  language: 'ko',
                  components: 'country:kr',
                  type: 'subway_station',
                  // types: '(regions)',
                }}
                GooglePlacesDetailsQuery={{
                  fields: 'formatted_address',
                }}
                filterReverseGeocodingByTypes={['locality']}
                renderDescription={row =>
                  row.structured_formatting.main_text + '역'
                }
              />
            ) : (
              <FoodInput
                onFocus={() => {
                  onFocus();
                }}
                onBlur={() => {
                  onBlur();
                }}
                focusVal={focusVal}
                placeholder="음식을 검색해 주세요."
              />
            )}
          </SearchInputWrap>
        </SearchHeader>
      </SearchContianer>
    </Dismisskeyboard>
  );
};
export default Search;
