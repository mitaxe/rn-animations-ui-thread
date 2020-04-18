import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'

interface BoxProps {
  style?: any
}

const Box: React.FC<BoxProps> = ({ style }) => (
  <Animated.View style={[styles.container, style]} />
);

const styles = {
  container: {
    flex: 1,
    margin: 10,
    width: '80%',
    height: 100,
    borderRadius: 6,
    backgroundColor: '#fff',
  }
}

export default Box;
