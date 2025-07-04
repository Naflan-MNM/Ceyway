import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";

const OpenPage3 = ({ navigation }) => {
  const GoToStartPage = () => {
    navigation.navigate("LoginPage");
  };
  return (
    <ImageBackground
      source={require("../assets/images/wheretogo.jpg")}
      style={styles.background}
    >
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <View style={styles.overlay}>
        <View
          style={{
            backgroundColor: "#212843",
            padding: 15,
            borderRadius: 10,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text
            style={{
              color: "#ccdbf1",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Plan, Save, and Share!
          </Text>
          <Text style={{ color: "white", fontSize: 12 }}>
            Save your trips and share them with friends. Let’s make travel more
            fun and memorable.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View style={styles.pagination}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={[styles.dot, styles.activeDot]} />
            </View>
            <TouchableOpacity style={styles.button} onPress={GoToStartPage}>
              <Text style={styles.buttonText}>Get Started!</Text>
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
    justifyContent: "space-between",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginTop: 50,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    paddingBottom: 70,
    marginBottom: 20,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
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

export default OpenPage3;
