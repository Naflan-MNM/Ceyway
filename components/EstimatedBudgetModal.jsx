import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

const EstimatedBudgetModal = ({ visible, onClose, budget }) => {
  if (!budget) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.budgetModal}>
          <Text style={styles.budgetTitle}>Estimated Budget Breakdown</Text>
          <View style={styles.budgetsummary}>
            <Text style={styles.budgetItem}>
              🚗 Transportation: {budget.transportation}
            </Text>
            <Text style={styles.budgetItem}>
              🏨 Accommodation: {budget.accommodation}
            </Text>
            <Text style={styles.budgetItem}>🍽️ Food: {budget.food}</Text>
            <Text style={styles.budgetItem}>
              🎟️ Activities: {budget.activities}
            </Text>
            <Text style={styles.budgetTotal}>💰 Total: {budget.total}</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.56)",
    justifyContent: "center",
    alignItems: "center",
  },
  budgetModal: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  budgetsummary: {
    padding: 20,
  },
  budgetTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#333",
  },
  budgetItem: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
  },
  budgetTotal: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    color: "#2a41e8",
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#2a41e8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
});

export default EstimatedBudgetModal;
