import React, { Fragment, useState } from 'react';
import {
  View,
  StyleSheet,
  Button,
  SafeAreaView,
  Dimensions
} from 'react-native';
import { useTimingTransition } from 'react-native-redash';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import Box from '../components/Box';

const { multiply } = Animated;

const transformOrigin = -1 * (Dimensions.get('screen').width / 2 - 20);

function getColor(num: number) {
  return num === 0 ? 'blue' : num === 1 ? 'yellow' : 'green';
}

const CardsTransitions = () => {
  const [toggled, setToggled] = useState(0);
  const transition = useTimingTransition(toggled, {
    duration: 400,
    easing: Easing.inOut(Easing.ease)
  });

  return (
    <Fragment>
      <SafeAreaView style={styles.container}>
        {[...Array(3)].map((e, i) => {
          const direction = interpolate(i, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1]
          });

          const rotate = multiply(
            direction,
            interpolate(transition, {
              inputRange: [0, 1],
              outputRange: [0, Math.PI / 6]
            }))

          return (
            <View key={i} style={styles.boxContainer}>
              <Box
                key={i}
                style={[
                  styles.box,
                  { backgroundColor: getColor(i) },
                  {
                    transform: [
                      { translateX: transformOrigin },
                      { rotate },
                      { translateX: -transformOrigin }
                    ]
                  }
                ]}
              />
            </View>
          );
        })}
      </SafeAreaView>
      <SafeAreaView style={styles.bottomNavbar}>
        <Button
          title={!toggled ? `Rotate` : 'Reset'}
          onPress={() => setToggled(prev => !prev)}
        />
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  boxContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    flex: 0,
    height: 200
  },
  bottomNavbar: {
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

export default CardsTransitions;
