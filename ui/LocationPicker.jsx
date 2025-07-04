import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  TextInput,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

const LocationPicker = ({ route, navigation }) => {
  const mapRef = useRef(null);
  const { field } = route.params;
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let current = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = current.coords;

      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };

      setRegion(initialRegion);
      setLocation({ latitude, longitude });
      setLoading(false);
    })();
  }, []);

  const moveToLocation = (lat, lon) => {
    const newRegion = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setRegion(newRegion);
    setLocation({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
    mapRef.current?.animateToRegion(newRegion, 1000);
  };

  const searchLocation = async (query, moveToFirstResult = false) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      query
    )}&format=json&addressdetails=1&limit=5&countrycodes=lk`;

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "CeywayApp/1.0 naflanm084@gmail.com",
        },
      });

      const data = await response.json();
      setSuggestions(data);

      if (moveToFirstResult && data.length > 0) {
        selectSuggestion(data[0]);
      }
    } catch (error) {
      console.error("Nominatim error:", error);
      setSuggestions([]);
    }
  };

  const selectSuggestion = (item) => {
    const { lat, lon, display_name } = item;
    moveToLocation(lat, lon);
    setSearchQuery(display_name);
    setSuggestions([]);
    Keyboard.dismiss();
  };

  const confirmLocation = async () => {
    if (!location) return;

    const places = await Location.reverseGeocodeAsync(location);
    const place = places[0];
    const name =
      place?.name || place?.city || place?.region || "Selected Location";

    navigation.navigate("StartPage", {
      [`${field}Coords`]: location,
      [`${field}Name`]: name,
    });
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#333"
            style={{ marginLeft: 10, marginRight: 8 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search location..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              searchLocation(text);
            }}
            returnKeyType="search"
            onSubmitEditing={() => searchLocation(searchQuery, true)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery("");
                setSuggestions([]);
              }}
            >
              <Ionicons
                name="close-circle"
                size={22}
                color="#888"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.place_id.toString()}
          style={styles.suggestionList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectSuggestion(item)}>
              <Text style={styles.suggestionItem}>{item.display_name}</Text>
            </TouchableOpacity>
          )}
        />

        <View style={{ flex: 1 }}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            provider={PROVIDER_GOOGLE}
            region={region}
            showsUserLocation={true}
            showsMyLocationButton={true}
            zoomControlEnabled={Platform.OS === "android"}
            onPress={(e) => setLocation(e.nativeEvent.coordinate)}
          >
            {location && (
              <Marker
                coordinate={location}
                draggable
                onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
              />
            )}
          </MapView>

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={confirmLocation}
          >
            <Text style={styles.buttonText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 3,
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    elevation: 5,
    height: 45,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  suggestionList: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    maxHeight: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    zIndex: 2,
    elevation: 3,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  confirmButton: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#6C63FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
