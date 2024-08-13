import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { sendAlert } from '../services/api';

const AlertButton = ({ setAlertSent,userId }) => {
  const handleAlert = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Location permission denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    await sendAlert(userId, [location.coords.latitude, location.coords.longitude]);
    alert('Alert sent to nearby doctors!');
    setAlertSent(prev=>!prev);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Emergency Alert"
        onPress={handleAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export default AlertButton;
