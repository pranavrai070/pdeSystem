import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  { title: 'Item 1', text: 'Text 1' },
  { title: 'Item 2', text: 'Text 2' },
  { title: 'Item 3', text: 'Text 3' },
];

const MyCarousel = () => {
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <Carousel
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth * 0.75}
      layout={'default'}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 250,
    padding: 50,
    marginLeft: 25,
    marginRight: 25,
  },
  title: {
    fontSize: 20,
  },
  text: {
    fontSize: 15,
  },
});

export default MyCarousel;
