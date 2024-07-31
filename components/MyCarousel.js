import React, { useState,useRef } from 'react';
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native';
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import { AntDesign } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

const data = [
  { title: 'Safe & Precise LASIK', text: 'Freedom from glasses forever in just 30min',link:"problems",imgSrc:require('../assets/images/featureCardImages/lasik.png') },
  { title: 'Connect with doctors in 2 mins', text: 'Experts available 24/7',link:"connect",imgSrc:require('../assets/images/featureCardImages/connect.png')},
  { title: 'Insure your family', text: "Explore India's best health plans wit top rated doctors",link:"insure",imgSrc:require('../assets/images/featureCardImages/insure.png') },
  { title: 'Fix your Receding Hairline', text: 'Connect with top Hair Transplant experts',link:"problems",imgSrc:require('../assets/images/featureCardImages/connect.png') },
];

const MyCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <View  className="" style={styles.itemContainer}>
      <View>
        <View className="flex flex-col">
        <View className="mb-2 translate-x-20">
        <AntDesign name="rightcircle" size={24} color="white" />
        </View>
        <Text className="text-xl text-white font-bold leading-5">{item.title}</Text>
        
        </View>  
        <Text className=" mt-2 text-white leading-4">{item.text}</Text>
      </View>

      <View className="flex justify-center items-center">
      <View style={styles.featureImgContainer}>
        <Image source={item.imgSrc} style={styles.featureImg} />
      </View>
      </View>

    </View>
  );

  return (
    <View>
    <Carousel
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth / 2.2}
      firstItem={0}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      contentContainerCustomStyle={styles.carouselContainer}
      onSnapToItem={(index) => setActiveIndex(index+1)}
    />
          <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    paddingLeft: 5
  },
  itemContainer: {
    backgroundColor: '#459cd7',
    borderRadius: 15,
    height: 250,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
  },
  text: {
    fontSize: 15,
  },
  paginationContainer: {
    paddingVertical: 12,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  featureImgContainer: {
    width: 100,
    height: 100,
    // borderRadius: 35, // To make the container circular
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  featureImg: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // Ensures the image covers the container without being cut
  },
});

export default MyCarousel;
