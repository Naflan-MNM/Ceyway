import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const TrendingPlaceDetails = ({ route }) => {
  const { place } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={place.image} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.description}>{place.description}</Text>
        {/* Add more details here as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1A1A2E" },
  image: { width: "100%", height: 250 },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 10 },
  description: { fontSize: 16, color: "#ddd", lineHeight: 24 },
});

export default TrendingPlaceDetails;
