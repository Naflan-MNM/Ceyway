import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
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

const sriLankaDistricts = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Moneragala",
  "Ratnapura",
  "Kegalle",
];

const StartPage = ({ navigation, route }) => {
  const { setdestinationData, setOnTheWayData, LOCAL_IP } =
    useContext(CeywayContext);
  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedDistricts, setSuggestedDistricts] = useState([]);

  const [currentLocationData, setCurrentLocationData] = useState({
    latitude: null,
    longitude: null,
    distance: null,
    name: "",
  });

  const toTitleCase = (str) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

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
  }, [route.params]);

  useEffect(() => {
    console.log("Updated currentLocation:", currentLocationData);
  }, [currentLocationData]);

  const GoToStartPage2 = async () => {
    /* if (!currentLocation || !destination) return; */

    /* setIsLoading(true);
    try {
      const destinationRes = await fetch(
        `http://${LOCAL_IP}:8080/api/travel-app/get-attractions/Anuradhapura`
      );
      if (!destinationRes.ok) {
        const errorText = await destinationRes.text();
        throw new Error(`Destination fetch failed: ${errorText}`);
      }
      const destinationData = await destinationRes.json();

      const onTheWayRes = await fetch(
        `http://${LOCAL_IP}:8080/api/travel-app/route/nearby-attractions?originLat=8.0385&originLng=80.5939&destLat=8.5922&destLng=81.1968&maxDistanceKm=15`
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
    } */
    navigation.navigate("DestinationsScreen");
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

  console.log("destinatios", destination);

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
          <TextInput
            style={styles.input}
            placeholder="Where to go?"
            placeholderTextColor="#888"
            value={destination}
            onChangeText={(text) => {
              const formatted = toTitleCase(text);
              setDestination(formatted);
              const filtered = sriLankaDistricts.filter((d) =>
                d.toLowerCase().startsWith(formatted.toLowerCase())
              );
              setSuggestedDistricts(formatted ? filtered : []);
            }}
          />
        </View>

        {suggestedDistricts.length > 0 && (
          <FlatList
            data={suggestedDistricts}
            keyExtractor={(item) => item}
            style={styles.suggestionList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={() => {
                  setDestination(item);
                  setSuggestedDistricts([]);
                }}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}

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
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("TrendingPlaceDetails", { place: item })
            }
          >
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
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
  suggestionList: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    borderRadius: 8,
    maxHeight: 150,
    marginBottom: 10,
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  suggestionText: {
    color: "#333",
    fontSize: 16,
  },
});

export default StartPage;
