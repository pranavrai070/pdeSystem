import React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { useNavigation } from "expo-router";

const Index = () => {

  const navigation=useNavigation();

  const data = {
    name: 'John Doe',
    email: 'johndoe@example.com'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Emergency Health App</Text>
      <Text style={styles.description}>
        This app helps patients connect with nearby doctors in case of a heart
        emergency. Simply press the alert button to notify doctors within a 5km
        radius.
      </Text>
      <View style={styles.buttonContainer}>
      
        <Link  href={'/authscreen?signup=false'}>
        <View style={styles.authButton}>
          <Text>Login</Text>
        </View>
        </Link>


        <Link  href={'/authscreen?signup=true'}>
        <View style={styles.authButton}><Text> SignUp</Text></View>
        </Link>
        {/* <TouchableOpacity onPress={()=>{
          navigation.navigate("Appointments")
        }}>
        <View style={styles.authButton}><Text> Appointment</Text></View>
        </TouchableOpacity>

        <Link href="(menu)/appointments">
        <View style={styles.authButton}><Text> Appointment inside with LInk method</Text></View>
        </Link> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  authButton:{
  backgroundColor:"orange",
  width:200,
  height:40,
  display:"felx",
  justifyContent:"center",
  alignItems:"center",
  borderRadius:10
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    gap:10
  },
});

export default Index;
