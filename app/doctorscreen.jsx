import React from 'react';
import { View, Text } from 'react-native';
import AlertList from '../components/AlertList';

const DoctorScreen = () => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AlertList/>
    </View>
  );
};

export default DoctorScreen;
