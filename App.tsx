import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createSharedElementStackNavigator, } from 'react-navigation-shared-element';

import FlexTransitions from './views/FlexTransitions';
import CardsTransitions from './views/CardsTransitions';
import DarkMode from './views/DarkMode';
import Loading from './views/Loading';
import PanGestures from './views/PanGestures';
import SharedElemets from './views/SharedElements';
import HotelPage from './views/HotelPage'

type SharedStackParams = {
  SharedElements: undefined;
  HotelPage: {
    id: number;
    src: string;
  };
};


const Stack = createStackNavigator();

const { Navigator, Screen } = createSharedElementStackNavigator<SharedStackParams>();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="FlexTransitions" component={FlexTransitions} />
        <Stack.Screen name="CardsTransitions" component={CardsTransitions} />
        <Stack.Screen name="DarkMode" component={DarkMode} />
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="PanGestures" component={PanGestures} />
      </Stack.Navigator> */}
      <Navigator>
        <Screen name="SharedElements" component={SharedElemets} />
        <Screen
          name="HotelPage"
          component={HotelPage}
          sharedElementsConfig={(route, otherRoute, showing) => {
            const { item } = route.params;
            return [{
              id: `item.${item.id}.photo`,
              animation: 'move',
            }];
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
