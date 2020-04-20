import React from 'react';
import { View, FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';


interface IHotel {
  id: string;
  name: string;
  image: any;
  desc: string;
}

interface IHotelProps {
  item: IHotel
}

const hotels = [
  {
    id: 'hotel1',
    name: 'Beverly',
    image: require('../assets/hotel1.jpg'),
    desc: 'Some information'
  },
  {
    id: 'hotel2',
    name: 'La France',
    image: require('../assets/hotel2.jpg'),
    desc: 'Some information'
  },
  {
    id: 'hotel3',
    name: 'Verona',
    image: require('../assets/hotel3.jpg'),
    desc: 'Some information'
  },
  {
    id: 'hotel4',
    name: 'Bellagio',
    image: require('../assets/hotel4.png'),
    desc: 'Some information'
  }
];

const Hotel: React.FC<IHotelProps> = ({ item, navigation }) => {
  const { id, image, name, desc } = item
  return (
    <View style={styles.hotelContainer}>
      <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.push('HotelPage', { item })}>
        <SharedElement id={`item.${id}.photo`}>
          <Image style={styles.image} source={image} />
        </SharedElement>
      </TouchableOpacity>
      <View style={styles.descContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
    </View>
  );
};

const SharedElements = ({ navigation }) => {
  return (
    <FlatList
      data={hotels}
      renderItem={({ item }) => <Hotel item={item} navigation={navigation} />}
      keyExtractor={(item: IHotel) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  hotelContainer: {
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row'
  },
  image: {
    width: 150,
    height: 100,
    borderRadius: 35
  },
  imageContainer: {
    flex: 0.4,

    justifyContent: 'center',
    alignItems: 'center'
  },
  descContainer: {
    flex: 0.6,
    padding: 20
  },
  name: {
    alignSelf: 'center',
    fontSize: 24
  },
  desc: {
    paddingTop: 20,
    fontSize: 20
  }
});

export default SharedElements;
