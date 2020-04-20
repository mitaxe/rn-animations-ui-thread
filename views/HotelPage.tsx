import React from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';

const HotelPage = ({ route, navigation }) => {
  // const item = navigation.getParam('item')
  const { item: { id, image, desc, name } } = route.params
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <SharedElement id={`item.${id}.photo`}>
           <Image source={image} style={styles.image} />
        </SharedElement>
      </View>
      <View style={styles.textContainer}>
        <Text>{name}</Text>
        <Text>{desc}</Text>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 0.4
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 0.6
  }
}

export default HotelPage;
