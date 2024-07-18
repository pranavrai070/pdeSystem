import { View, Text, StyleSheet } from 'react-native';

export default function Analytics() {
  return (
    <View style={styles.container}>
      <Text>Analyticsinside menu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});