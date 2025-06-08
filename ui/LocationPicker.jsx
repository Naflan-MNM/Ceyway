import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import * as Location from "expo-location";
import axios from "axios";

const LocationPicker = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);

  const handleLongPress = async (e) => {
    const coords = e.geometry.coordinates;
    setLocation({ lat: coords[1], lng: coords[0] });

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${coords[1]}&lon=${coords[0]}&format=json`
      );
      const placeName = res.data.display_name;
      navigation.navigate("StartPage", {
        locationName: placeName,
        lat: coords[1],
        lng: coords[0],
      });
    } catch (err) {
      Alert.alert("Failed to get location name");
    }
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        onLongPress={handleLongPress}
        styleURL={MapboxGL.StyleURL.Street}
      >
        <MapboxGL.Camera zoomLevel={10} centerCoordinate={[80.7718, 7.8731]} />
        {location && (
          <MapboxGL.PointAnnotation
            id="selected"
            coordinate={[location.lng, location.lat]}
          />
        )}
      </MapboxGL.MapView>
      <Text style={styles.instructions}>
        Long-press on the map to select your location.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  instructions: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
  },
});

export default LocationPicker;
