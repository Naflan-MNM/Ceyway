import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import { CeywayContext } from "../context/CeywayContext";

const LandingPage = ({ navigation }) => {
  const { data } = useContext(CeywayContext);

  const GoToNextPage = () => {
    navigation.navigate("OpenPage2");
  };

  return (
    <ImageBackground
      source={require("../assets/images/bg2.jpg")}
      style={styles.background}
    >
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <View style={styles.overlay}>
        {/* Logo */}
        <Image
          source={require("../assets/images/CEYWAY logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={styles.title}>Welcome to CEYWAY</Text>

        {/* Description card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Discover Sri Lanka, Your Way!</Text>
          <Text style={styles.cardText}>
            From breathtaking beaches to cultural wonders, Ceyway’s AI-powered
            travel planner makes it easy to explore the best of Sri Lanka. Let’s
            get started!
          </Text>

          <View style={styles.bottomRow}>
            <View style={styles.pagination}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

            <TouchableOpacity style={styles.button} onPress={GoToNextPage}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 10,
    color: "#1E2640",
    outlineColor: "#1E2640",
  },
  card: {
    backgroundColor: "#212843",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  cardTitle: {
    color: "#ccdbf1",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    color: "white",
    fontSize: 12,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: "#ccdbf1",
    marginHorizontal: 2,
  },
  activeDot: {
    width: 15,
  },
  button: {
    backgroundColor: "#555de3",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LandingPage;
