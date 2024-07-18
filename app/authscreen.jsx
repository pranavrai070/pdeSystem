import { View, Text, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import { useLocalSearchParams } from 'expo-router';


const AuthScreen = () => {

  const params = useLocalSearchParams();

  console.log("getting data",params.signup);

  const signUpBoolean=JSON.parse(params.signup);

  return (
    <View style={styles.container}>
    <AuthForm isSignup={signUpBoolean} />
  </View>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });

export default AuthScreen;