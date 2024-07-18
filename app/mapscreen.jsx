import React from 'react';
import { View } from 'react-native';
import MapView from '../components/MapView';

const MapScreen = () => {
  const route="Route"
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <MapView route={route} />
    </View>
  );
};

export default MapScreen;
