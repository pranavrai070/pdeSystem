import React,{useState,useMemo} from 'react';
import { AuthContext } from '../services/authContext';
import { Stack } from "expo-router";
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {

  const [authState, setAuthState] = useState({ token: null, role: null });

  const authContext = useMemo(() => ({
    signIn: (token, role) => {
      setAuthState({ token, role });
    },
    signOut: () => {
      setAuthState({ token: null, role: null });
    },
  }), []);


  return (
    <AuthContext.Provider value={authContext}>
    <SafeAreaProvider>
    <Stack
        screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>  
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(menu)" options={{ headerShown: false }} />
            <Stack.Screen name="authscreen" options={{ title: 'Sign In' }} />
            <Stack.Screen name="patientscreen"  options={{ title: 'Patient Dashboard' }} />
            <Stack.Screen name="mapscreen" options={{ title: 'Map Route' }} />
            <Stack.Screen name="doctorscreen"  options={{ title: 'Doctor Dashboard' }} />
    </Stack>
    </SafeAreaProvider>
    </AuthContext.Provider>
  );
}
