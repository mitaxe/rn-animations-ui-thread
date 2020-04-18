import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { onGestureEvent, withOffset } from 'react-native-redash'
import Box from '../components/Box';

const { Value, event } = Animated;

const PanGestures = () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY
  })

  const translateX = withOffset(translationX, state)
  const translateY = withOffset(translationY, state)

  return (
    <SafeAreaView style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={[
            styles.boxContainer,
            { transform: [{ translateX }, { translateY }] } as Animated.TransformStyleTypes
          ]}
        >
          <Box />
        </Animated.View>
      </PanGestureHandler>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  boxContainer: {
    width: 200,
    height: 200
  }
});

export default PanGestures;
