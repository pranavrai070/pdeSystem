import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertButton from "../../components/AlertButton";
import LottieView from "lottie-react-native";
import { AuthContext } from "../../services/authContext";
import { getPatientPendingAlert, getDoctor,getAlerts } from "../../services/api";
import Map from "../../components/MapView";
import doctorImage from "../../assets/images/doctor_image.jpg";
import { useFocusEffect } from "@react-navigation/native";
import AlertList from "../../components/AlertList";
import io from "socket.io-client";

const socket = io('http://192.168.15.169:7666'); // Connect to your server

const Emergency = () => {
  const { token } = useContext(AuthContext);

  const handleCallDoctor = () => {
    // Use Linking to open the phone dialer with the doctor's mobile number
    if (doctorData.mobileNumber) {
      Linking.openURL(`tel:${doctorData.mobileNumber}`);
    } else {
      console.log("Doctor does not have a mobile number.");
    }
  };

  const [userRole, setUserRole] = useState(null);

  const [loading, setLoading] = useState(true); // State for loading

  const [alertSent,setAlertSent]=useState(false);

  const [alerts,setAlerts]=useState([]);


  const [alertPending, setAlertPending] = useState(false);

  const [alertAccepted,setAlertAccepted]=useState(false);

  const [doctorId, setDoctorId] = useState(null);

  const [doctorData, setDoctorData] = useState([]);

  const [acceptedData, setAcceptedData] = useState([]);

  const [reload,setReload]=useState(false);

  // const [socket, setSocket] = useState(null);

  const doctorCordinate = [28.6405155, 77.2827173];
  const patientCordinate = [28.6347508, 77.2198171];

  const patientId = "668bc1abae4ccc316dec6967";

  // useEffect(() => {
  //   // Fetch the user role from AsyncStorage when the component mounts
  //   const fetchUserRole = async () => {
  //     try {
  //       const role = await AsyncStorage.getItem('userRole');
  //       console.log("User role fetched:", role);
  //       setUserRole(role);
  //     } catch (error) {
  //       console.error("Error fetching user role:", error);
  //     }
  //   };

  //   fetchUserRole();
  // }, []);


  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        console.log("User role fetched:", role);
        setUserRole(role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await getAlerts({ type: "pending" });
      setAlerts(response.alerts);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }finally {
      setLoading(false); // End loading
    }
  };








  const fetchPendingAlertData = async () => {
    try {
      console.log("Fetching pending alerts", alertPending);
      console.log("getting pending alret initial");
      const alertData = await getPatientPendingAlert(patientId);
      console.log(
        "get patient pending alert data",
        alertData?.alert[0]?.status
      );

      const findPendingOrAcceptedAlertIndex = (alerts) => {
        return alerts.findIndex(alert => alert.status === 'pending' || alert.status === 'accepted');
      };

      const index = findPendingOrAcceptedAlertIndex(alertData.alert);
      console.log(index); // Output: 1 (if the pending alert is the second one in the array)
      const status = alertData?.alert[index]?.status;
      console.log("getting type of ", typeof status);
      if (status === "pending") {
        console.log("code if me aa gya");
        setAlertPending(true);
      }
      if (status === "accepted") {
        console.log("code if accepted me aa gya");
        console.log("getting doctor id to know",alertData.alert[index].doctor);
        const doctorId = alertData.alert[index].doctor;
        const doctorData = await getDoctor(doctorId);
        console.log("getting doc data at last",doctorData);
        if (doctorData?.doctor) {
          setDoctorData(doctorData.doctor);
        }
        setAlertPending(false);
        setAlertAccepted(true);
        setAcceptedData(alertData.alert[index]);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    // // Listen for 'chat message' events
    // socket.on('chat message', (msg) => {
    //   setMessages((prevMessages) => [...prevMessages, msg]);
    // });

    // Listen for 'new alert' events
    console.log("socket useEffect runs");
    socket.on('new_alert', (alert) => {
       console.log("new alert event triggred",alert);
       fetchAlerts();
    });
    socket.on('alert_accepted', (alert) => {
       console.log("accept alert event triggred...............................................................",alert);
       fetchPendingAlertData();
    });

    // Clean up listeners on component unmount
    return () => {
      socket.off('new_alert');
      socket.off('alert_accepted');
    };
  }, []);


  


  useFocusEffect(
    useCallback(() => {
      // Reset state variables
      setAlertPending(false);
      setAlertAccepted(false);
      setDoctorId(null);
      setDoctorData([]);
      setAcceptedData([]);
      setReload(prev=>!prev);
      setLoading(prev=>!prev);

      // Fetch data
      {userRole!=="doctor"?fetchPendingAlertData():fetchAlerts()}
    }, [userRole,alertSent])
  );


  if (loading) {
    // Show loading indicator
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }else return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {userRole==="doctor"?(
    <View>
      <AlertList alerts={alerts}/>
    </View>
    ):(<View>
      {alertPending ? (
      <View>
        <LottieView
          source={require("../../assets/animations/searching_2.json")}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text className="text-xl font-bold">Alerts sent to Nearby Doctors</Text>
      </View>
    ) : (
      <>
      {alertAccepted ? (<View style={styles.container}>
          <Map />
          <View style={styles.doctorInfoContainer}>
            <View style={styles.docInfo}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>{doctorData.name}</Text>
                <Text style={styles.email}>{doctorData.email}</Text>
                <Text style={styles.specialty}>{doctorData.specialty}</Text>
              </View>
              <Image style={styles.docImage} source={doctorImage} />
            </View>
            {(
              <View style={styles.buttons}>
                <TouchableOpacity
                  onPress={handleCallDoctor}
                  style={[styles.callButton]}
                >
                  <Text style={styles.callButtonText}>Call Doctor</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCallDoctor}
                  style={[styles.callButton, styles.bookRide]}
                >
                  <Text style={styles.callButtonText}>Book Ride</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCallDoctor}
                  style={[styles.callButton, styles.openMap]}
                >
                  <Text style={styles.callButtonText}>Open G-Map</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>):(<AlertButton setAlertSent={setAlertSent} userId={patientId} />)}
      </>
    )}
    </View>)}
  </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bookRide: {
    backgroundColor: "green",
  },
  animation: {
    width: 200,
    height: 200,
  },
  openMap: {
    backgroundColor: "blue",
  },
  doctorInfoContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  docInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 5,
  },
  specialty: {
    fontSize: 16,
    marginBottom: 15,
  },
  docImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  callButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    marginTop: 2,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 1,
  },
  callButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Emergency;
