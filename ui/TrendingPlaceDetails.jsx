import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const TrendingPlaceDetails = ({ route, navigation }) => {
  const { place, allPlaces, index } = route.params;

  const goToNextPlace = () => {
    const nextIndex = (index + 1) % allPlaces.length; // loops back to 0
    navigation.replace("TrendingPlaceDetails", {
      place: allPlaces[nextIndex],
      allPlaces,
      index: nextIndex,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={place.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.description}>{place.description}</Text>

        <TouchableOpacity style={styles.button} onPress={goToNextPlace}>
          <Text style={styles.buttonText}>Next Location</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A1A2E" },
  image: {
    marginTop: 25,
    width: "100%",
    height: 250,
    borderRadius: 25,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: "#CCCCCC",
    lineHeight: 26,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TrendingPlaceDetails;
