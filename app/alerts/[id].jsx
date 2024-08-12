import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { acceptAlert, getAlert } from '../../services/api';
import { distanceFormula } from '../../utils/distanceFormula';
import axios from 'axios';

const AlertDetail = () => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyAXRrclC0e-UyxIOur0E_tKBm5-9ivXizU";
  const { id } = useLocalSearchParams();
  const [alert, setAlert] = useState(null);
  const router = useRouter();
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState('');

  const getAddressFromCoordinates = async (lat, long) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAPS_API_KEY}`);
      const address = response.data.results[0].formatted_address;
      return address;
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Address not available';
    }
  };

  const doctorCordinate = [28.6405155, 77.2827173];

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await getAlert(id);
        setAlert(response.alert);
        const patientCordinate = response.alert.location.coordinates;
        const addr = await getAddressFromCoordinates(patientCordinate[0], patientCordinate[1]);
        setAddress(addr);
        const distance = distanceFormula(patientCordinate, doctorCordinate).toFixed(2);
        setDistance(distance);
      } catch (error) {
        console.error('Error fetching alert:', error);
      }
    };
    fetchAlert();
  }, [id]);

  const handleAccept = async () => {
    try {
      await acceptAlert(id, alert.patient);
      alert.status = 'accepted';
      router.back();
    } catch (error) {
      console.error('Error accepting alert:', error);
    }
  };

  if (!alert) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Alert Details</Text>
        <Text style={styles.detailText}>Raised At: <Text style={styles.detailValue}>{new Date(alert.createdAt).toLocaleTimeString()}</Text></Text>
        <Text style={styles.detailText}>Address: <Text style={styles.detailValue}>{address}</Text></Text>
        <Text style={styles.detailText}>Distance from you: <Text style={styles.detailValue}>{distance} Km</Text></Text>
        <Button title="Accept Alert" onPress={handleAccept} color="#4CAF50" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  detailValue: {
    fontWeight: '600',
    color: '#333',
  },
});

export default AlertDetail;
