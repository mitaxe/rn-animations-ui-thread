import React from 'react';
import { StyleSheet, View } from 'react-native';
import FlexTransitions from './views/FlexTransitions'
import CardsTransitions from './views/CardsTransitions'
import DarkMode from './views/DarkMode'
import Loading from './views/Loading'
import PanGestures from './views/PanGestures'

export default function App() {
  return (
    <View style={styles.container}>
      {/* <FlexTransitions /> */}
      {/* <CardsTransitions /> */}
      {/* <DarkMode /> */}
      {/* <Loading /> */}
      <PanGestures />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});
