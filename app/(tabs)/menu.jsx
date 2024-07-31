import { StyleSheet, Text, View ,TouchableOpacity,Image,FlatList, ScrollView } from "react-native";
import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';
import patientImage from '../../assets/images/patient_image.jpg';
import HealtSocreIcon from '../../assets/images/health_socre.png';
import TrustScoreICon from '../../assets/images/trust_icon.png';
import ConsultIcon from '../../assets/images/consultation_icon.png';
import { Link } from "expo-router";

const Menu = () => {

   const navigation = useNavigation();

    const data = [
        { title: 'Health Score', description: '77', icon: <Image className="-translate-y-2.5" resizeMode="contain"  style={styles.cardIcon} source={require('../../assets/images/health_socre.png')} /> },
        { title: 'Trust Points', description: '54', icon: <Image resizeMode="contain"  style={styles.cardIcon2} source={require('../../assets/images/trust_icon.png')} />},
      ];
      
      const Card = ({ icon, title, description }) => {
        return (
        <View className="">
          <Link href="(menu)/Analytics">
          <View style={styles.pointsIcon} className="">{icon}</View>
          </Link>

         <View className="translate-y-12">
          <Text className="text-md font-bold">{description}</Text>
          <Text className="text-md font-bold">{title}</Text>
          </View>

          </View>
        );
      };


      const options = [
        { id: 1, name: 'Appointments', icon: <AntDesign name="carryout" size={30} color="black" /> },
        { id: 2, name: 'Orders', icon: <Image resizeMode="contain"  style={styles.cardIcon3} source={require('../../assets/images/orders_icon.png')} /> },
        { id: 3, name: 'Consultations', icon: <Image resizeMode="contain"  style={styles.cardIcon3} source={require('../../assets/images/consultation_icon.png')} /> },
        { id: 4, name: 'My Doctor', icon: <Image resizeMode="contain"  style={styles.cardIcon3} source={require('../../assets/images/doctor_icon.png')} />  },
        { id: 5, name: 'Health Analytics', icon: <Image resizeMode="contain"  style={styles.cardIcon3} source={require('../../assets/images/health_card_icon.png')} />},
        { id: 6, name: 'About Health', icon:<AntDesign name="infocirlce" size={24} color="black" /> },
        { id: 7, name: 'Help Center', icon: <MaterialIcons name="help" size={30} color="black" /> },
        { id: 8, name: 'Settings', icon: <MaterialIcons name="settings" size={30} color="black" />},
        { id: 9, name: 'Rate GoLiv', icon: <MaterialIcons name="rate-review" size={30} color="black" />},
        { id: 10, name: 'Logout', icon: <MaterialIcons name="logout" size={30} color="black" /> },
        { id: 11, name: 'Delete Account', icon: <MaterialIcons name="delete" size={30} color="black" />},
      ];
      
      // const OptionItem = ({ item }) => (
      //   <TouchableOpacity style={styles.optionContainer}>
      //     <View style={styles.iconContainer}>
      //       <Image source={item.icon} style={styles.icon} />
      //     </View>
      //     <Text style={styles.optionText}>{item.name}</Text>
      //   </TouchableOpacity>
      // );

      // const menuItemPressHandler=(item)=>{
      //    console.log("name on pressing any button");
      //    console.log(item.name);
      //    if(item.name!=="Logout"){
      //     navigation.navigate('/(menu)/appointments');
      //    }
      //    if(item.name=="Logout"){
      //     navigation.navigate('home');
      //    }
      // }
      function removeSpaces(inputString) {
        return inputString.replace(/\s+/g, '');
      }

  return (
    <View className="h-full">
    <ScrollView>

    <LinearGradient
      colors={['#459cd7', '#22dbed', '#7cfdca']} // Green to blue gradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      locations={[0, 0.5, 1]} // Adjust locations to create the desired gradient effect
      style={styles.card}
      className="p-2 m-4"
      >
      <View
        className="translate-y-8 h-40"
      >

       <View className="flex flex-row space-x-24 > * + * ">
        <View className="-translate-y-6">
       <MaterialIcons name="health-and-safety" size={50} color="black" />
       </View>
        <View className="translate-y-0 flex flex-col items-end">
           <Link href="(menu)/UpdateProfile">
           <Feather name="edit" size={24} color="black" />
           </Link>
          <Text className="">8233434678</Text>
          </View>

       </View>

       <Link href="(menu)/UpdateProfile">
        <View
          className=" flex flex-row justify-center item-center p-1 w-20 h-20 translate-x-[230px] -translate-y-20 ml-10"
        >
        
          <Image
            style={styles.docImage}
            source={patientImage}
          />

        </View>
        </Link>


        <View className="flex flex-row justify-around gap-12 px-0 mt-0 -translate-y-24">
      {data.map((item, index) => (
        <Card key={index} icon={item.icon} title={item.title} description={item.description} />
      ))}
    </View>
      </View>

      </LinearGradient>
    
    
    
      <View className="m-4">

     {options.map((item)=>(
      <Link key={item.id} href={`(menu)/${removeSpaces(item.name)}`}>
      <View style={styles.optionContainer} key={item.id}>
          <View style={[styles.iconContainer,(item.id===10||item.id===11)?styles.dangerOption:null]}>
             {item.icon}
          </View>
          <Text style={styles.optionText}>{item.name}</Text>
        </View>
        </Link>
     ))}
    </View>
    
    </ScrollView>
    </View>
    
  );
};

export default Menu;

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 20,
        elevation: 5, // Shadow effect
      },
    smallText:{
        fontSize:10
    },
    cardIcon:{
      width:40
    },
    cardIcon2:{
      width:55
    },
    cardIcon3:{
      width:35
    },
    pointsIcon:{
      width:10,
      height:10
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
      },
      iconContainer: {
        backgroundColor: '#3ea6f0',
        borderRadius: 6,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        elevation: 4, // Box shadow effect
      },
      dangerOption:{
        backgroundColor:"#f4511e"
      },
      icon: {
        width: 30,
        height: 30,
      },
      optionText: {
        fontSize: 16,
        fontWeight:'400',
        marginLeft:20
      },
      docImage: {
        width: 70,
        height: 70,
        borderRadius: 40
      },

});
