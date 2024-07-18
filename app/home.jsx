import { View, Text, StyleSheet } from 'react-native';
import { Link } from "expo-router";


export default function Home() {

  return (
    <View style={styles.container}>
    <Link href="(menu)/appointments">
    <Text>Welcome to the Home Tab</Text>
    </Link>
    <Link href="/">
    <Text>Index</Text>
    </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display:"flex",
    gap:50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
