import React from 'react';

import {
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export const Button = (props) => {
  const {text, textStyle, style, onPress} = props;
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    backgroundColor: '#037AFF'
  },
  text: {
    fontSize: 14,
    color: '#FFF'
  }
});