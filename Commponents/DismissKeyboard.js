import {Keyboard, Platform, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
const Dismisskeyboard = ({children}) => {
  const dismissKeyboardPress = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{flex: 1}}
      disabled={Platform.OS === 'web'}
      onPress={dismissKeyboardPress}>
      {children}
    </TouchableWithoutFeedback>
  );
};
export default Dismisskeyboard;
