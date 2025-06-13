import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FooterNavigation from "../components/FooterNavigation";
import { CeywayContext } from "../context/CeywayContext";

const StartPage = ({ navigation, route }) => {
  const { setdestinationData, setOnTheWayData, LOCAL_IP } =
    useContext(CeywayContext);
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [currentLocationData, setCurrentLocationData] = useState({
    latitude: null,
    longitude: null,
    distance: null,
    name: "",
  });

  const [destinationLocationData, setDestinationLocationData] = useState({
    latitude: null,
    longitude: null,
    distance: null,
    name: "",
  });

  useEffect(() => {
    if (route.params?.currentCoords) {
      setCurrentLocationData((prev) => ({
        ...prev,
        latitude: route.params.currentCoords.latitude,
        longitude: route.params.currentCoords.longitude,
      }));
    }
    if (route.params?.currentName) {
      setCurrentLocation(route.params.currentName);
    }
    if (route.params?.destinationName) {
      setDestination(route.params.destinationName);
    }
    if (route.params?.destinationCoords) {
      setDestinationLocationData((prev) => ({
        ...prev,
        latitude: route.params.destinationCoords.latitude,
        longitude: route.params.destinationCoords.longitude,
      }));
    }
  }, [route.params]);

  useEffect(() => {
    console.log("Updated currentLocation:", currentLocationData);
  }, [currentLocationData]);

  useEffect(() => {
    console.log("Updated destination:", destinationLocationData);
  }, [destinationLocationData]);

  const GoToStartPage2 = async () => {
    if (!currentLocation || !destination) return;

    setIsLoading(true);
    try {
      const destinationRes = await fetch(
        `http://${LOCAL_IP}:8080/api/travel-app/get-attractions/${currentLocation}`
      );
      if (!destinationRes.ok) {
        const errorText = await destinationRes.text();
        throw new Error(`Destination fetch failed: ${errorText}`);
      }
      const destinationData = await destinationRes.json();

      const onTheWayRes = await fetch(
        `http://${LOCAL_IP}:8080/api/travel-app/get-ontheway-attractions/${destination}/${currentLocation}`
      );
      if (!onTheWayRes.ok) {
        const errorText = await onTheWayRes.text();
        throw new Error(`On-the-way fetch failed: ${errorText}`);
      }
      const onTheWayData = await onTheWayRes.json();

      setdestinationData(destinationData);
      setOnTheWayData(onTheWayData);

      navigation.navigate("DestinationsScreen");
    } catch (err) {
      console.error("Failed to fetch travel data:", err.message);
      Alert.alert(
        "Error",
        "We couldn’t fetch travel data. Please check your connection or spelling and try again.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Retry", onPress: GoToStartPage2 },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const trendingDestinations = [
    {
      id: "1",
      title: "Ella Sri Lanka",
      description:
        "Ella is not just a destination; it's a journey into nature's heart.",
      image: require("../assets/images/ella.jpg"),
    },
    {
      id: "2",
      title: "Casuarina Beach",
      description: "Casuarina Beach where the horizon meets tranquility.",
      image: require("../assets/images/casuarina.jpg"),
    },
    {
      id: "3",
      title: "Horton Plains",
      description:
        "Step into Horton Plains, where nature whispers its secrets.",
      image: require("../assets/images/horton.jpg"),
    },
    {
      id: "4",
      title: "Knuckles Mountain Range",
      description: "Find serenity in the misty peaks of the Knuckles Range.",
      image: require("../assets/images/knuckles.jpg"),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

      <View style={styles.header}>
        <Text style={styles.headerText}>Where do you want to go?</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Location</Text>
        <View style={styles.inputBox}>
          <Ionicons name="location-outline" size={20} color="#888" />
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              navigation.navigate("LocationPicker", { field: "current" })
            }
          >
            <Text style={{ color: currentLocation ? "#333" : "#888" }}>
              {currentLocation || "Select current location"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Destination</Text>
        <View style={styles.inputBox}>
          <Ionicons name="navigate-outline" size={20} color="#888" />
          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              navigation.navigate("LocationPicker", { field: "destination" })
            }
          >
            <Text style={{ color: destination ? "#333" : "#888" }}>
              {destination || "Select destination"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.findButton}
          onPress={GoToStartPage2}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.findButtonText}>Find Destinations</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Explore Trending Destinations</Text>
      <FlatList
        data={trendingDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
      />

      <FooterNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A1A2E" },
  header: { marginTop: 40, alignItems: "center" },
  headerText: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  inputContainer: { padding: 15 },
  label: { color: "#fff", fontSize: 14, fontWeight: "500", marginBottom: 5 },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: { flex: 1, height: 40, fontSize: 16, color: "#333", marginLeft: 10 },
  findButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 8,
    alignItems: "center",
    padding: 10,
    marginTop: 10,
  },
  findButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginVertical: 10,
  },
  cardList: { paddingHorizontal: 15, paddingBottom: 60 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: { width: "100%", height: 120 },
  cardContent: { padding: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  cardDescription: { fontSize: 14, color: "#666", marginTop: 5 },
});

export default StartPage;
