import React, { useState, useRef } from 'react';
import { View, StyleSheet, Switch, SafeAreaView } from 'react-native';
import {
  Transitioning,
  Transition,
  TransitioningView
} from 'react-native-reanimated';

enum Themes {
  Light,
  Dark
}

const transition = (
  <Transition.Together>
    <Transition.In type={'fade'} durationMs={400}></Transition.In>
    <Transition.Out type={'fade'} durationMs={400}></Transition.Out>
  </Transition.Together>
);

const App = () => {
  const [theme, changeTheme] = useState(Themes.Light);
  const ref = useRef<TransitioningView>(null);

  const onValueChange = () => {
    const newSwitchValue = theme === Themes.Light ? Themes.Dark : Themes.Light;
    changeTheme(newSwitchValue);

    if (ref && ref.current) {
      ref.current.animateNextTransition();
    }
  };

  return (
    <Transitioning.View style={styles.container} {...{ ref, transition }}>
      <SafeAreaView style={styles.container}>
        {theme === Themes.Dark && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'black'
            }}
          />
        )}
        <Switch value={!!theme} onValueChange={onValueChange}></Switch>
      </SafeAreaView>
    </Transitioning.View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
