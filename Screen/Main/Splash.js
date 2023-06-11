import {useCallback, useEffect, useRef} from 'react';
import {ActivityIndicator, Animated} from 'react-native';
import styled, {useTheme} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SplachScreen = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.boxColor};
  margin: 0;
  align-items: center;
  justify-content: center;
`;
const Logo = styled(Animated.Text)`
  font-weight: bold;
  font-size: 56px;
  color: ${props => props.theme.colors.accent};
  margin-bottom: 20px;
`;

const Splash = ({run}) => {
  const {colors} = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    fadeOut();
  }, [fadeOut]);
  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SplachScreen>
      <Logo style={{opacity: fadeAnim}}>
        먹DAM
        <Icon name="restaurant" />
      </Logo>
      {!run ? <ActivityIndicator size="large" color={colors.accent} /> : null}
    </SplachScreen>
  );
};
export default Splash;
