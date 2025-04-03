import React from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";

const ProcessingScreen = ({ navigation }) => {
    
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#8DA3F0" style={styles.loader} />
        <Text style={styles.thinkingText}>Thinking!</Text>
        <Text style={styles.subText}>Your plan will be created shortly.</Text>
      </View>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111C44",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 100,
  },
  content: {
    alignItems: "center",
  },
  loader: {
    marginBottom: 20,
  },
  thinkingText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  subText: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
  cancelButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  cancelText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProcessingScreen;
