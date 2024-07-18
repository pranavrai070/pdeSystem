import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getAlerts } from '../services/api';
import { Link } from 'expo-router';

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await getAlerts();
        setAlerts(response.alerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };
    fetchAlerts();
  }, []);

  const renderAlertItem = ({ item }) => (
    <TouchableOpacity style={styles.alertItem}>
      <Link href={`/alerts/${item._id}`} style={styles.link}>
        <Text style={styles.alertText}>Status: {item.status}</Text>
        <Text style={styles.alertText}>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
        <Text style={styles.alertText}>Updated At: {new Date(item.updatedAt).toLocaleString()}</Text>
        <Text style={styles.alertText}>Location: {item.location.coordinates.join(', ')}</Text>
      </Link>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alerts}
        renderItem={renderAlertItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f8f8f8',
  },
  listContent: {
    paddingBottom: 20,
  },
  alertItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  alertText: {
    fontSize: 16,
    marginBottom: 5,
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
});

export default AlertList;
