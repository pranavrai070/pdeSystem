import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
// import { LinearGradient } from 'expo-linear-gradient';
import PagerView from "react-native-pager-view";
import MyCarousel from "../../components/MyCarousel";

const Symptoms = [
  {
    id: 1,
    title: "Stomach Pain",
    icon: require("../../assets/images/health_issues/stomach_issue_icon.png"),
  },
  {
    id: 2,
    title: "Diabetes",
    icon: require("../../assets/images/health_issues/diabetes_issue_icon.png"),
  },
  {
    id: 3,
    title: "Bone & Joint",
    icon: require("../../assets/images/health_issues/bone_issue_icon.png"),
  },
  {
    id: 4,
    title: "Stress & Anxiety",
    icon: require("../../assets/images/health_issues/stress_issue_icon.png"),
  },
  {
    id: 5,
    title: "Pregnancy Issues",
    icon: require("../../assets/images/health_issues/pregnancy_issue_icon.png"),
  },
  {
    id: 6,
    title: "Pimples & Acne",
    icon: require("../../assets/images/health_issues/acne_issue_icon.png"),
  },
  {
    id: 7,
    title: "Hair & Scalp Issues",
    icon: require("../../assets/images/health_issues/hair_issue_icon.png"),
  },
  {
    id: 8,
    title: "Sexual Disorders",
    icon: require("../../assets/images/health_issues/sexual_disorder_icon.png"),
  },
];

const serviceCardData = [
  { id: 1, title: "Card 1", backgroundColor: "#FF7E5F" },
  { id: 2, title: "Card 2", backgroundColor: "#6A82FB" },
  { id: 3, title: "Card 3", backgroundColor: "#11998E" },
  { id: 4, title: "Card 4", backgroundColor: "#FC5C7D" },
];

const { width } = Dimensions.get("window");

const renderItem = ({ item }) => (
  <TouchableOpacity
    style={[styles.card, { backgroundColor: item.backgroundColor }]}
  >
    <Text style={styles.cardTitle}>{item.title}</Text>
  </TouchableOpacity>
);

const renderItems = () => {
  return Symptoms.map((item) => (
    <TouchableOpacity key={item.id} style={styles.issueItem}>
      <View style={styles.issueIconContainer}>
        <Image source={item.icon} style={styles.issueIcon} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  ));
};

const Home = () => {
  return (

    <View style={styles.container}>



    <View>
    <MyCarousel />
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  illnessContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  issueItem: {
    width: "25%", // Slightly less than 25% to allow for spacing
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    textAlign: "center",
  },
  issueIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 35, // To make the container circular
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#459cd7",
  },
  issueIcon: {
    width: "80%",
    height: "80%",
    resizeMode: "contain", // Ensures the image covers the container without being cut
  },
  button: {
    width: "80%",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5, // Optional: You can adjust the border radius as needed
  },
  buttonText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    flex: 1,
  },
});

export default Home;
