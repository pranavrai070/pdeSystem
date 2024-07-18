import React, {useState, useContext,useEffect } from 'react';
import { View ,Text,StyleSheet,TouchableOpacity,Linking,Image} from 'react-native';
import AlertButton from '../../components/AlertButton';
import { AuthContext } from '../../services/authContext';
import { getPatientPendingAlert,getDoctor } from '../../services/api';
import Map from '../../components/MapView';
import doctorImage from '../../assets/images/doctor_image.jpg';

const Emergency = () => {
  const { token } = useContext(AuthContext);

  const handleCallDoctor = () => {
    // Use Linking to open the phone dialer with the doctor's mobile number
    if (doctorData.mobileNumber) {
      Linking.openURL(`tel:${doctorData.mobileNumber}`);
    } else {
      console.log('Doctor does not have a mobile number.');
    }
  };

  const [alertPending,setAlertPending]=useState(false);

  const [doctorId,setDoctorId]=useState(null);

  const [doctorData,setDoctorData]=useState([]);

  const [pendingData,setPendingData]=useState([]);

  const doctorCordinate=[ 28.6405155, 77.2827173 ];
  const patientCordinate=[28.6347508,77.2198171];

  const patientId="668bc1abae4ccc316dec6967";

  useEffect(()=>{
    const getPendingAlertData=async()=>{
       try {
        console.log("codes get here");
        const pendingAlertData=await getPatientPendingAlert(patientId);
        console.log("codes get here also");
        console.log(pendingAlertData);
        console.log("getting in depth data",pendingAlertData.alert[0].doctor);
        if(pendingAlertData?.alert?.length!==0){
          setAlertPending(true);
          setPendingData(pendingAlertData?.alert[0]);
          setDoctorId(pendingAlertData?.alert[0].doctor);
        }
       } catch (error) {
        console.error('Error fetching alerts:', error);
       }
    };
    getPendingAlertData();
  },[]);


  //to get docotor Data
  useEffect(()=>{
    const getAssignedDoctorData=async()=>{
      try {
       console.log("codes get here also to get docotr");
       console.log("getting doctor id",doctorId);

       const doctorData=await getDoctor(doctorId);
       console.log(" docotro codes get here also");
       console.log(doctorData);
       if(doctorData?.doctor?.length!==0){
         setDoctorData(doctorData?.doctor);
       }
      } catch (error) {
       console.error('Error fetching Docotr:', error);
      }
   };
   if(doctorId!==null){
    getAssignedDoctorData();
   }
  },[doctorId]);




  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {!alertPending ? <AlertButton userId={patientId} />:<>
    <View style={styles.container}>
      <Map />
      <View style={styles.doctorInfoContainer}>
        <View style={styles.docInfo}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{doctorData.name}</Text>
            <Text style={styles.email}>{doctorData.email}</Text>
            <Text style={styles.specialty}>{doctorData.specialty}</Text>
          </View>
          <Image
            style={styles.docImage}
            source={doctorImage}
          />
        </View>
        {doctorData.mobileNumber && (
          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleCallDoctor} style={[styles.callButton]}>
              <Text style={styles.callButtonText}>Call Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCallDoctor} style={[styles.callButton,styles.bookRide]}>
              <Text style={styles.callButtonText}>Book Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCallDoctor} style={[styles.callButton,styles.openMap]}>
              <Text style={styles.callButtonText}>Open G-Map</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
    </>}
     
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bookRide:{
    backgroundColor:"green"
  },
  openMap:{
    backgroundColor:"blue"
  },
  doctorInfoContainer: {
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
    alignItems: 'center'
  },
  docInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  textContainer: {
    flex: 1,
    marginRight: 10
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  email: {
    fontSize: 16,
    marginBottom: 5
  },
  specialty: {
    fontSize: 16,
    marginBottom: 15
  },
  docImage: {
    width: 80,
    height: 80,
    borderRadius: 40
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  callButton: {
    backgroundColor: "red",
    padding: 8,
    borderRadius: 5,
    marginTop: 2,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 1
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16
  }
});


export default Emergency;
