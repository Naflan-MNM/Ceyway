import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { CeywayContext } from "../context/CeywayContext";

// Import your TripDayDetails component
import TripDayDetails from "../components/TripDayDetails.jsx";

const PlanByAIScreen = ({ route, navigation }) => {
  const { fromDate, toDate, members, vehicle } = useContext(CeywayContext);
  /* const { planData } = route.params;
  const { tripPlan } = planData.data; */
  const tripPlan = {
    data: {
      tripPlan: {
        tripDuration: "2 days",
        estimatedBudget: {
          transportation: "LKR 25000",
          accommodation: "LKR 30000",
          food: "LKR 10000",
          activities: "LKR 15000",
          total: "LKR 80000",
        },
        weatherSummary: {
          "2025-04-10": {
            location: "Anuradhapura",
            description: "overcast clouds",
            temperature: 26.3,
            humidity: 80,
            windSpeed: 5.6,
          },
          "2025-04-11": {
            location: "Trincomalee",
            description: "broken clouds",
            temperature: 28.7,
            humidity: 70,
            windSpeed: 6.4,
          },
        },
        weatherAssessment:
          "The weather is suitable for travel with some cloud cover but no rain expected.",
        itinerary: [
          {
            day: "Day 1",
            date: "2025-04-10",
            weather: {
              description: "overcast clouds",
              temperature: 26.3,
            },
            activities: [
              {
                time: "9:00 AM",
                place: "Habarana",
                duration: "1 hour",
                distance: "45 km",
                travelTime: "1 hour",
              },
              {
                time: "11:00 AM",
                place: "Minneriya National Park",
                duration: "2 hours",
              },
            ],
          },
          {
            day: "Day 2",
            date: "2025-04-11",
            weather: {
              description: "broken clouds",
              temperature: 28.7,
            },
            activities: [
              {
                time: "9:00 AM",
                place: "Marble Beach",
                duration: "2 hours",
                distance: "120 km",
                travelTime: "2 hours",
              },
              {
                time: "12:00 PM",
                place: "Dutch Bay Beach",
                duration: "1 hour",
              },
              {
                time: "2:00 PM",
                place: "Lovers Leap",
                duration: "1 hour",
              },
              {
                time: "4:00 PM",
                place: "Kanniya Hot Water Springs",
                duration: "1 hour",
              },
            ],
          },
        ],
      },
      start: "Anuradhapura",
      selectedAttractions: [
        "Marble Beach",
        "Dutch Bay Beach",
        "Lovers Leap",
        "Kanniya Hot Water Springs",
      ],
      endDate: "2025-04-11",
      selectedOnTheWay: ["Habarana", "Minneriya National Park"],
      vehicleType: "SUV",
      numOfMembers: 4,
      startDate: "2025-04-10",
      destination: "Trincomalee",
    },
    message: "Trip plan generated successfully",
    status: "success",
  };

  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openDetails = (dayItem) => {
    setSelectedDay(dayItem);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setSelectedDay(null);
    setModalVisible(false);
  };

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

        {/* Show each day */}
        {tripPlan?.data?.tripPlan?.itinerary?.map((dayItem, index) => (
          <View key={index}>
            <Text style={styles.dayText}>
              {dayItem.day} - {dayItem.date}
            </Text>
            {dayItem.activities.map((activity, idx) => (
              <View key={idx} style={styles.destinationCard}>
                <Image
                  source={{ uri: "https://i.imgur.com/NjEdKbb.jpg" }}
                  style={styles.image}
                />
                <View style={styles.destinationContent}>
                  <Text style={styles.destinationTitle}>{activity.place}</Text>
                  <Text style={styles.timeSlot}>{activity.time}</Text>
                  <Text style={styles.destinationDetail}>
                    • Duration: {activity.duration}
                  </Text>
                  {activity.distance && (
                    <Text style={styles.destinationDetail}>
                      • Distance: {activity.distance}
                    </Text>
                  )}
                  {activity.travelTime && (
                    <Text style={styles.destinationDetail}>
                      • Travel Time: {activity.travelTime}
                    </Text>
                  )}
                  <TouchableOpacity onPress={() => openDetails(dayItem)}>
                    <Text style={styles.linkText}>more details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Detailed View Modal */}
      <Modal visible={modalVisible} animationType="slide">
        {selectedDay && (
          <TripDayDetails
            dayData={selectedDay}
            weather={
              tripPlan.data?.tripPlan?.weatherSummary?.[selectedDay?.date]
            }
            onClose={closeDetails}
          />
        )}
      </Modal>

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
