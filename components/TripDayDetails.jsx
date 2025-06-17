import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TripDayDetails = ({ dayData, weather, onClose }) => {
  return (
    <View style={styles.card}>
      <ScrollView>
        <Text style={styles.title}>
          {dayData.day} - {dayData.date}
        </Text>
        <Text style={styles.weather}>
          Weather: {weather.description}, {weather.temperature}°C
        </Text>

        <Text style={styles.sectionTitle}>Activities</Text>
        {dayData.activities.map((activity, idx) => (
          <View key={idx} style={styles.activityItem}>
            <Ionicons name="location-outline" size={16} color="#333" />
            <Text style={styles.activityText}>
              {activity.time} - {activity.place} ({activity.duration}){" "}
              {activity.distance ? `| ${activity.distance}` : ""}{" "}
              {activity.travelTime ? `| ${activity.travelTime}` : ""}
            </Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  weather: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  sectionTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 4,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  activityText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
  },
  closeBtn: {
    backgroundColor: "#6366f1",
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
    alignItems: "center",
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default TripDayDetails;
