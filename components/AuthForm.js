import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AuthContext } from '../services/authContext';
import { loginUser, signupUser } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const AuthForm = ({ isSignup }) => {
  const [email, setEmail] = useState('david@anymail.com');
  const [password, setPassword] = useState('Kumar@1999');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator
  const { signIn } = useContext(AuthContext);

  const handleAuth = async () => {
    setLoading(true); // Set loading to true when API call starts

    try {
      if (isSignup) {
        const user = { name, email, password, age, gender, role: specialty ? 'doctor' : 'patient', specialty };
        const response = await signupUser(user);
        console.log("resposne from server", response);
        if (response.success) {
          signIn(response.token, user.role);
        } else {
          alert(response.error.message || 'Signup failed');
        }
      } else {
        const response = await loginUser(email, password);
        console.log("getting response for login", response.role);
        if (response) {
          await AsyncStorage.setItem('userRole', response.role);
          router.navigate('(tabs)')
        } else {
          alert(response.error || 'Login failed');
        }
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when API call ends
    }
  };

  return (
    <View style={styles.container}>
      {isSignup && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
          />
          <TextInput
            style={styles.input}
            placeholder="Specialty (for doctors)"
            value={specialty}
            onChangeText={setSpecialty}
          />
        </>
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAuth}
        disabled={loading} // Disable button when loading
      >
        {loading ? (
          <ActivityIndicator color="#fff" /> // Show loader when loading
        ) : (
          <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text> // Show text when not loading
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(isSignup ? 'SignIn' : 'SignUp')}
      >
        <Text style={styles.toggle}>
          {isSignup ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#459cd7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  toggle: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default AuthForm;
