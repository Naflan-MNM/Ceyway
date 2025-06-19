import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Share,
} from "react-native";
import { CeywayContext } from "../context/CeywayContext";
import EstimatedBudgetModal from "../components/EstimatedBudgetModal";
import TripDayDetails from "../components/TripDayDetails.jsx";

const PlanByAIScreen = ({ route, navigation }) => {
  const { fromDate, toDate, members, vehicle } = useContext(CeywayContext);
  const { planData } = route.params;

  console.log("Schedule data", planData.data);

  const [selectedDay, setSelectedDay] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [budgetModalVisible, setBudgetModalVisible] = useState(false);

  const openDetails = (dayItem, activity) => {
    setSelectedDay(dayItem);
    setSelectedActivity(activity);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setSelectedDay(null);
    setSelectedActivity(null);
    setModalVisible(false);
  };

  const openBudgetModal = () => setBudgetModalVisible(true);
  const closeBudgetModal = () => setBudgetModalVisible(false);

  const handleShare = async () => {
    const plan = planData?.data?.tripPlan;
    const start = planData?.data?.start;
    const destination = planData?.data?.destination;

    let message = `🚗 CEYWAY Trip Plan\nFrom: ${start} → ${destination}\n📅 ${fromDate} - ${toDate}\n👥 Members: ${members}\n\nItinerary:\n`;

    plan?.itinerary?.forEach((day, index) => {
      message += `\n📌 Day ${index + 1} (${day.date}):\n`;
      day.activities.forEach((act) => {
        message += `  • ${act.time} - ${act.place} (${act.duration})\n`;
      });
    });

    message += `\n💰 Estimated Budget: ${plan.estimatedBudget.total}`;

    try {
      await Share.share({ message });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const tripPlan = planData?.data?.tripPlan;

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

        {/* Trip Days Rendering */}
        {tripPlan?.itinerary?.map((dayItem, index) => (
          <View key={index}>
            <Text style={styles.dayText}>
              Day {index + 1} - {dayItem.date}
            </Text>
            {dayItem.activities?.map((activity, idx) => (
              <View key={idx} style={styles.destinationCard}>
                <Image source={activity.imagePath} style={styles.image} />
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
                  <TouchableOpacity
                    onPress={() => openDetails(dayItem, activity)}
                  >
                    <Text style={styles.linkText}>more details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}

        <TouchableOpacity
          style={styles.estimateBudgetButton}
          onPress={openBudgetModal}
        >
          <Text style={styles.shareText}>Estimated Budget</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Details Modal */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          {selectedDay && selectedActivity && (
            <TripDayDetails
              dayData={selectedDay}
              activity={selectedActivity}
              weather={tripPlan?.weatherSummary?.[selectedDay?.date]}
              onClose={closeDetails}
            />
          )}
        </View>
      </Modal>

      {/* Budget Modal */}
      <EstimatedBudgetModal
        visible={budgetModalVisible}
        onClose={closeBudgetModal}
        budget={tripPlan?.estimatedBudget}
      />
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
    top: 20,
    backgroundColor: "#5d65f3",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  estimateBudgetButton: {
    top: 10,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.56)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlanByAIScreen;
