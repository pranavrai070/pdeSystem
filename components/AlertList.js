import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { distanceFormula } from '../utils/distanceFormula';

const AlertList = ({ alerts}) => {

  const doctorCordinate = [28.6405155, 77.2827173];

  const renderAlertItem = ({ item }) => {
    const patientCordinate = item.location.coordinates;
    const distance = distanceFormula(patientCordinate, doctorCordinate).toFixed(2); // Distance in km

    return (
      <TouchableOpacity style={styles.alertItem}>
        <Link href={`/alerts/${item._id}`} style={styles.link}>
          <View>
            <Text className="font-bold" style={styles.alertText}>Raised At: {new Date(item.createdAt).toLocaleTimeString()}</Text>
          </View>
          <View>
            <Text className="font-bold" style={styles.alertText}>Distance from You: {distance} km</Text>
          </View>
        </Link>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {alerts.length===0?
        <Text style={styles.text}>
         No alerts Pending
        </Text>
    :
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  text:{
    paddingHorizontal:100
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f0f4f7',
  },
  listContent: {
    paddingBottom: 20,
  },
  alertItem: {
    width: Dimensions.get('window').width - 20, // Full width minus margin
    padding: 15,
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#86aff0',
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent:"center",
    alignItems: "center",
  },
  alertText: {
    fontSize: 16,
    color: '#333', // Darker color for better readability
    marginBottom: 5,
  },
  link: {
    textDecorationLine: 'none',
  },
});

export default AlertList;
