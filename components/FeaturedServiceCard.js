import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";


const FeaturedServiceCard = () => {
  const imageUrl =
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <View style={styles.card}>
      <Text className="text-white" style={styles.heading}>
        Affordable Surgeries by{" "}
        <Text className="font-bold">Expert Surgeons</Text>
      </Text>
      <View
        className="flex flex-row justify-center gap-6"
        style={styles.imageContainer}
      >
        <View className="flex flex-col justify-center items-center">
        <View style={styles.serviceIconContainer}>
        <Image source={require('../assets/images/featureCardImages/kneeReplacement.png')} style={styles.serviceIcon} />
        </View>
        <Text>Knee</Text>
        </View>

        <View className="flex flex-col justify-center items-center">
        <View style={styles.serviceIconContainer}>
        <Image source={require('../assets/images/featureCardImages/cataract.png')} style={styles.serviceIcon} />
        </View>
        <Text>Cataract</Text>
        </View>

        <View className="flex flex-col justify-center items-center">
        <View style={styles.serviceIconContainer}>
        <Image source={require('../assets/images/featureCardImages/open_heart_surgery.png')} style={styles.serviceIcon} />
        </View>
        <Text>Cardio</Text>
        </View>

        <View className="flex flex-col justify-center items-center">
        <View style={styles.serviceIconContainer}>
        <Image source={require('../assets/images/featureCardImages/more_xs.png')} style={styles.serviceIcon} />
        </View>
        <Text>More</Text>
        </View>
      </View>

      <View className="flex flex-row gap-8 mt-0">
        <Text className="text-wrap" style={styles.title}>
          All insurance accepted
          {"\n"}
          No Cost EMI available
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Cost Estimate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#459cd7",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  heading: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: "center",
  },
    // imageContainer: {
    //   display:"flex",
    //   flexDirection: 'row',
    //   justifyContent:"space-evenly",
    //   marginBottom: 10,
    // },
//   image: {
//     backgroundColor:"#ccd1d9",
//     width: 50,
//     height: 50,
//     borderRadius: 15,
//     resizeMode:"contain"
//   },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15, // To make the container circular
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#ccd1d9",
  },
  serviceIcon: {
    width: "90%",
    height: "90%",
    resizeMode: "contain", // Ensures the image covers the container without being cut
  },
  title: {
    fontSize: 12,
    color: "white",
    lineHeight:17,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#343294",
    paddingVertical: 2,
    paddingHorizontal: 14,
    borderRadius: 10,
    justifyContent:"center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FeaturedServiceCard;
