import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Linking } from 'expo';

const CallButton = ({ phoneNumber }) => {
  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Button
        title="Call Doctor"
        onPress={handleCall}
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

export default CallButton;
