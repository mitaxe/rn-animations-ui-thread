import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Transitioning,
  TransitioningView,
  Transition
} from 'react-native-reanimated';
import Box from '../components/Box';
import Selection from '../components/Selection';

const column = {
  id: 'column',
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const row = {
  id: 'row',
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const wrap = {
  id: 'wrap',
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  child: {
    flex: 0,
    width: Dimensions.get('screen').width / 2 - 20
  }
};

const layouts: any = { column, row, wrap };

const FlexTransitions = () => {
  const ref = useRef<TransitioningView>(null);
  const transition = <Transition.Change interpolation="easeInOut" />;
  const [currentLayout, onChangeLayout] = useState('column');

  return (
    <>
      <Transitioning.View
        style={[styles.boxContainer, layouts[currentLayout].container]}
        {...{ ref, transition }}
      >
        {[...Array(3)].map((e, i) => (
          <Box key={i} style={layouts[currentLayout].child} />
        ))}
      </Transitioning.View>
      <Selection
        value={currentLayout}
        onChange={(value: string) => {
          if (ref && ref.current) {
            ref.current.animateNextTransition();
          }
          onChangeLayout(value);
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    flex: 0.8
  }
});

export default FlexTransitions;
