import React from 'react';
import {Animated, Platform, StatusBar, useWindowDimensions} from 'react-native';
import SlidingUpPanel from 'rn-sliding-up-panel';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Children, useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import PhotoItem from '../Photo/PhotoItem';
import {useAnimatedGestureHandler} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const ios = Platform.OS === 'ios';

const SlideContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.boxColor};
  padding: 0px;
  border-radius: 20px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
`;
const SlideBar = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.boxColor};
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const Bar = styled.View`
  width: 15%;
  padding: 2px;
  background-color: ${props => props.theme.colors.fontColor};
  border-radius: 5px;
`;
const SlideHeader = styled.View`
  width: 100%;
  padding: 5px 20px 20px 15px;
  background-color: ${props => props.theme.colors.boxColor};
`;
const SlideTitle = styled.Text`
  font-weight: 800;
  font-size: 16px;
  color: ${props => props.theme.colors.fontColor}; ;
`;
const FlatList = styled.FlatList`
  flex: 1;
  /* align-items: center;
  justify-content: center; */
`;
const EmptyView = styled.View`
  width: 100%;
  height: 400px;
  background-color: ${props => props.theme.colors.boxColor};
  align-items: center;
  margin-top: 20px;
  border-color: #ddd;
  border-top-width: 1px;
`;
const EmptyTitle = styled.Text`
  margin-top: 50px;
  font-weight: 500;
  font-size: 16px;
  text-align: center;
  color: ${props => props.theme.colors.fontColor};
`;

const CloseButton = styled.TouchableOpacity`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: ${props => props.theme.colors.fontColor};
  margin-top: 20px;
`;
const CloseButtonText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: white;
`;
const Wrap = styled.View`
  width: 100%;
  flex: 1;
`;
const SlidePanel = ({navigation, name, data}) => {
  const deviceHeight = useWindowDimensions().height;
  const insets = useSafeAreaInsets();
  const [allowDragging, setAllowDragging] = useState(true);

  const statusBarHeight = ios ? insets.bottom : StatusBar.currentHeight;
  const draggableRange = {
    top: deviceHeight - statusBarHeight - 155,
    bottom: deviceHeight / 6 - 50,
  };
  const snappingPoints = [draggableRange.top, draggableRange.bottom];

  const panelRef = useRef();
  const listRef = useRef();
  const wrapRef = useRef();
  const [panelPositionVal] = useState(
    new Animated.Value(draggableRange.bottom),
  );

  const gestureHandler = useAnimatedGestureHandler(
    {
      onStart: (_, context) => {
        console.log(context);
      },
    },
    [],
  );
  const renderItem = ({item}) => {
    return <PhotoItem id={item?.id} navigation={navigation} />;
  };
  const footerItem = () => {
    return (
      <EmptyView>
        <EmptyTitle>
          추천 장소를 보시려면 {'\n'}위치를 이동하거나 필터를 변경해보세요.
        </EmptyTitle>
        <CloseButton onPress={() => panelRef.hide()}>
          <CloseButtonText>확인</CloseButtonText>
        </CloseButton>
      </EmptyView>
    );
  };
  return (
    <SlidingUpPanel
      ref={panelRef}
      animatedValue={panelPositionVal}
      draggableRange={draggableRange}
      snappingPoints={snappingPoints}
      height={deviceHeight}
      allowDragging={allowDragging}
      backdropOpacity={0.5}>
      <SlideContainer ref={wrapRef}>
        <SlideBar>
          <Bar />
        </SlideBar>
        <SlideHeader>
          <SlideTitle>{name} 주변 둘러보기</SlideTitle>
        </SlideHeader>
        <FlatList
          ref={listRef}
          showsVerticalScrollIndicator={false}
          onTouchStart={() => setAllowDragging(false)}
          onTouchEnd={() => setAllowDragging(true)}
          onTouchCancel={() => setAllowDragging(true)}
          data={data?.searchPhotos}
          keyExtractor={photo => '' + photo?.id}
          renderItem={renderItem}
          ListFooterComponent={footerItem}></FlatList>
      </SlideContainer>
    </SlidingUpPanel>
    //   </Wrap>
    // </PanGestureHandler>
  );
};

export default SlidePanel;
