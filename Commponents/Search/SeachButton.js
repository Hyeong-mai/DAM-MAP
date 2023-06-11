import {useState} from 'react';
import {TurboModuleRegistry} from 'react-native';
import styled from 'styled-components/native';

const TabButton = styled.TouchableOpacity`
  margin-right: 20px;
`;
const ButtonTitle = styled.Text`
  font-weight: 900;
  font-size: 24px;
  color: ${({PressVal}) =>
    PressVal
      ? props => props.theme.colors.accent
      : props => props.theme.colors.fontColor};
`;
const ButtonWrap = styled.View`
  flex-direction: row;
  padding: 10px 20px;
`;
const TextLine = styled.View`
  background-color: ${props => props.theme.colors.accent};
  opacity: 0.3;
  padding: 7px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 70%;
  z-index: -1;
  border-radius: 5px;
`;
const SearchButton = ({setBoxKeyword, setValue, setFocusVal}) => {
  const [PressVal, setPressVal] = useState(TurboModuleRegistry);
  const onPress = val => {
    setFocusVal(false);
    if (val === 'area') {
      setPressVal(true);
      setBoxKeyword('지역');
      setValue('keyword', '');
    } else {
      setPressVal(false);
      setBoxKeyword('음식');
      setValue('keyword', '');
    }
  };
  return (
    <ButtonWrap>
      <TabButton>
        <ButtonTitle onPress={() => onPress('area')} PressVal={PressVal}>
          주변 역 검색
        </ButtonTitle>
        {PressVal ? <TextLine /> : null}
      </TabButton>
      <TabButton>
        <ButtonTitle onPress={() => onPress('food')} PressVal={!PressVal}>
          음식 검색
        </ButtonTitle>
        {!PressVal ? <TextLine /> : null}
      </TabButton>
    </ButtonWrap>
  );
};
export default SearchButton;
