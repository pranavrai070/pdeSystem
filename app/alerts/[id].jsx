import React,{useEffect} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { acceptAlert,getAlert } from '../../services/api';

const AlertDetail = () => {
  const { id } = useLocalSearchParams();
  const [alert, setAlert] = React.useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await getAlert(id);
        setAlert(response.alert);
      } catch (error) {
        console.error('Error fetching alert:', error);
      }
    };
    fetchAlert();
  }, [id]);

  const handleAccept = async () => {
    try {
      await acceptAlert(id,alert.patient);
      alert.status = 'accepted';
      // Optionally, navigate back or update the list
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
      <Text style={styles.detailText}>Status: {alert.status}</Text>
      <Text style={styles.detailText}>Created At: {new Date(alert.createdAt).toLocaleString()}</Text>
      <Text style={styles.detailText}>Updated At: {new Date(alert.updatedAt).toLocaleString()}</Text>
      <Text style={styles.detailText}>Location: {alert.location.coordinates.join(', ')}</Text>
      <Button title="Accept Alert" onPress={handleAccept} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AlertDetail;
