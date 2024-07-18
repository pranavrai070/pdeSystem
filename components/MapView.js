import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ActivityIndicator, Text,TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import customMapStyle from '../utils/customMapStyle';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { GOOGLE_MAPS_API_KEY } from '@env';

const Map = () => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyAXRrclC0e-UyxIOur0E_tKBm5-9ivXizU";
  const [loading, setLoading] = useState(true);

  const origin = { latitude: 28.6347508, longitude: 77.2198171 }; // Example origin (New Delhi)
  const destination = { latitude: 28.6405155, longitude: 77.2827173 }; // Example destination (Preet Vihar)

  const midPoint = {
    latitude: (origin.latitude + destination.latitude) / 2,
    longitude: (origin.longitude + destination.longitude) / 2,
  };

  const latitudeDelta = Math.abs(origin.latitude - destination.latitude) + 0.02;
  const longitudeDelta = Math.abs(origin.longitude - destination.longitude) + 0.02;

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleButtonPress = () => {
    // Implement your logic here when the button is pressed
    console.log('Button pressed');
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
    <MapView
      style={styles.map}
      initialRegion={{
        ...midPoint,
        latitudeDelta,
        longitudeDelta,
      }}
      customMapStyle={customMapStyle}
    >
      <Marker coordinate={origin} title="Origin" />
      <Marker coordinate={destination} title="Destination" />
      <MapViewDirections
        origin={origin}
        destination={destination}
        apikey={GOOGLE_MAPS_API_KEY}
        strokeWidth={4}
        strokeColor="green"
      />
    </MapView>
    </SafeAreaProvider>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  map: {
    width: windowWidth,
    height:"100%"
  },
  overlayButton:{
    flex:1,

  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
