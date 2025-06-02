import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { CeywayContext } from "../context/CeywayContext";

const PlanByAIScreen = ({ route, navigation }) => {
  const { fromDate, toDate, members, vehicle } = useContext(CeywayContext);
  const { planData } = route.params;
  const { tripPlan } = planData.data;
  console.log(tripPlan);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Travel plan by AI</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Members, Date & Vehicle</Text>
          <Text style={styles.text}>👤 {members}</Text>
          <Text style={styles.text}>🚗 {vehicle}</Text>
          <Text style={styles.text}>
            📅 {fromDate} - {toDate}
          </Text>
        </View>

        {/* Render each day of trip plan */}
        {tripPlan?.days.map((dayItem, index) => (
          <View key={index}>
            <Text style={styles.dayText}>
              Day {index + 1} - {dayItem.date}
            </Text>
            {dayItem.activities.map((activity, idx) => (
              <View key={idx} style={styles.destinationCard}>
                <Image
                  source={{ uri: "https://i.imgur.com/NjEdKbb.jpg" }} // or replace this with a dynamic or placeholder image url
                  style={styles.image}
                />
                <View style={styles.destinationContent}>
                  <Text style={styles.destinationTitle}>{activity.place}</Text>
                  <Text style={styles.timeSlot}>{activity.time}</Text>
                  <Text style={styles.destinationDetail}>
                    • Duration: {activity.duration}
                  </Text>
                  <Text style={styles.destinationDetail}>
                    • Distance: {activity.distance}
                  </Text>
                  <Text style={styles.destinationDetail}>
                    • Travel Time: {activity.travelTime}
                  </Text>
                  <Text style={styles.linkText}>more details</Text>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.shareButton}>
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131c3b",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  scroll: {
    paddingBottom: 100,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
    color: "#444",
  },
  dayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  destinationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  destinationContent: {
    flex: 1,
  },
  destinationTitle: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 4,
    color: "#000",
  },
  timeSlot: {
    backgroundColor: "#e3e7ff",
    color: "#2a41e8",
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  destinationDetail: {
    fontSize: 12,
    color: "#555",
  },
  linkText: {
    fontSize: 12,
    color: "#2a41e8",
    marginTop: 4,
  },
  shareButton: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#5d65f3",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  shareText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PlanByAIScreen;
