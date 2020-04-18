import React, { useState } from 'react';
import { View, SafeAreaView, Button, StyleSheet } from 'react-native';
import Animated, { Easing, Extrapolate } from 'react-native-reanimated';
import { useValues, useClocks } from 'react-native-redash';

const {
  Value,
  useCode,
  block,
  and,
  cond,
  set,
  timing,
  not,
  clockRunning,
  startClock,
  stopClock,
  interpolate,
  eq
} = Animated;

const Loading = () => {
  const [animated, setAnimated] = useState(true);
  const [progress, isPlaying] = useValues<number>([0, 1], []);
  const [clock] = useClocks(1, []);

  const runTiming = (clock: Animated.Clock) => {
    const state = {
      finished: new Value(0),
      position: new Value(0),
      frameTime: new Value(0),
      time: new Value(0)
    };

    const config = {
      toValue: new Value(1),
      duration: 1000,
      easing: Easing.linear
    };

    return block([
      timing(clock, state, config),
      cond(eq(state.finished, 1), [
        set(state.finished, 0),
        set(state.frameTime, 0),
        set(config.toValue, cond(eq(state.position, 1), 0, 1)),
        set(state.time, 0)
      ]),
      state.position
    ]);
  };

  isPlaying.setValue(animated ? 1 : 0)

  useCode(() => block([
    cond(and(eq(isPlaying, 0), clockRunning(clock)), stopClock(clock)),
    cond(and(eq(isPlaying, 1), not(clockRunning(clock))), startClock(clock)),
    set(progress, runTiming(clock)),
  ]), []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.content}>
        <View style={styles.bubblesContainer}>
          {[...Array(3)].map((_, i) => {
            const delta = 1 / 3;
            const start = i * delta;
            const end = start + delta;

            const opacity = interpolate(progress, {
              inputRange: [start, end],
              outputRange: [0.5, 1],
              extrapolate: Extrapolate.CLAMP
            });
            
            const scale = interpolate(progress, {
              inputRange: [start, end],
              outputRange: [1, 1.25],
              extrapolate: Extrapolate.CLAMP
            });

            return (
              <Animated.View
                key={i}
                style={[
                  styles.round,
                  {
                    opacity,
                    transform: [{ scale }] as Animated.TransformStyleTypes
                  }
                ]}
              />
            );
          })}
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.bottomBar}>
        <Button title={animated ? 'Pause' : 'Play'} onPress={() => setAnimated(!animated)} />
      </SafeAreaView>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  content: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBar: {
    flex: 0.05,
    backgroundColor: 'white',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bubblesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 150,
    borderRadius: 25,
    backgroundColor: 'white'
  },
  round: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: 'black'
  }
});
