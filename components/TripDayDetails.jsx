import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const animationMap = {
  Rain: require("../assets/animations/rain.json"),
  Sunny: require("../assets/animations/sunny.json"),
  Cloudy: require("../assets/animations/cloudy.json"),
  Windy: require("../assets/animations/windy.json"),
};

const getAnimation = (description = "") => {
  const desc = description.toLowerCase();

  if (
    desc.includes("rain") ||
    desc.includes("shower") ||
    desc.includes("drizzle")
  ) {
    return animationMap.Rain;
  }
  if (desc.includes("sun") || desc.includes("clear")) {
    return animationMap.Sunny;
  }
  if (
    desc.includes("cloud") ||
    desc.includes("overcast") ||
    desc.includes("fog") ||
    desc.includes("mist")
  ) {
    return animationMap.Cloudy;
  }
  if (desc.includes("wind") || desc.includes("breeze")) {
    return animationMap.Windy;
  }

  return null; // fallback if no match
};

const TripDayDetails = ({ dayData, activity, weather, onClose }) => {
  const animation = getAnimation(weather.description);
  return (
    <View style={styles.container}>
      {animation && (
        <View style={styles.animationWrapper}>
          <LottieView
            source={animation}
            autoPlay
            loop
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.overlay} />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={require("../assets/images/sigiriye.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.title}>
          {dayData.day} - {dayData.date}
        </Text>

        {activity && (
          <View>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>
                {/* <Ionicons name="location-outline" size={16} color="#333" /> */}
                {"  "}
                {activity.place}
                {"  "}
              </Text>
              <View style={styles.verticalLine} />
              <Text style={styles.weather}>
                {weather.description}, {weather.temperature}°C
              </Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityText}>
                {activity.time ? `🕘 Time: ${activity.time}\n` : ""}
                {activity.duration ? `⏱️ Duration: ${activity.duration}\n` : ""}
                {activity.distance ? `📏 Distance: ${activity.distance}\n` : ""}
                {activity.travelTime
                  ? `🚗 Travel Time: ${activity.travelTime}\n`
                  : ""}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9, // 90% of screen width
    maxHeight: height * 0.8, // 80% of screen height
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    alignSelf: "center", // Center horizontally
    marginTop: height * 0.1, // Add top margin to simulate vertical centering
  },
  animationWrapper: {
    position: "absolute",
    top: 70,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 20,
    overflow: "hidden", // Ensure animation is clipped within rounded border
    zIndex: -1,
  },
  overlay: {
    position: "absolute",
    top: 70,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  content: {
    paddingBottom: 80,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
    color: "#333",
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitle: {
    paddingBottom: 6,
    paddingTop: 6,
    backgroundColor: "rgb(11, 33, 159)",
    borderRadius: 20,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff" /* 
    paddingBottom: 6,
    marginBottom: 8, */,
  },
  weather: {
    fontSize: 18,
    color: "rgb(11, 33, 159)",
    fontWeight: "medium-bold",
  },
  activityItem: {
    marginLeft: 4,
    marginTop: 4,
  },
  activityText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  closeBtn: {
    backgroundColor: "#6366f1",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },
  closeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#ccc",
    alignSelf: "stretch",
    marginVertical: 6,
  },
  verticalLine: {
    width: 2,
    height: 26,
    backgroundColor: "rgb(11, 33, 159)",
    marginHorizontal: 8,
  },
});

export default TripDayDetails;
