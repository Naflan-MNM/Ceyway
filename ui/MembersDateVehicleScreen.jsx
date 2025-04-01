import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

const MembersDateVehicleScreen = ({ navigation }) => {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [members, setMembers] = useState(`${adults} Adults, ${children} Children`);
  const [modalVisible, setModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateRange, setDateRange] = useState(date.toDateString());
  const [vehicle, setVehicle] = useState('Car');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
      });
      setDateRange(formattedDate);
    }
  };

  const updateMembers = () => {
    setMembers(`${adults} Adults, ${children} Children`);
    setModalVisible(false);
  };

  const vehicles = [
    { name: 'Motorbike', icon: 'motorcycle' },
    { name: 'Three wheel', icon: 'car-side' },
    { name: 'Car', icon: 'car' },
    { name: 'Van', icon: 'shuttle-van' },
    { name: 'Bus', icon: 'bus' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Members, Date & Vehicle</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.inputBox} onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="user-friends" size={16} color="#6b7280" />
          <Text style={styles.inputText}>{members}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputBox} onPress={() => setShowDatePicker(true)}>
          <MaterialCommunityIcons name="calendar" size={16} color="#6b7280" />
          <Text style={styles.inputText}>{dateRange}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
        )}

        <TouchableOpacity style={styles.inputBox} onPress={() => setVehicleModalVisible(true)}>
          <FontAwesome5 name="car" size={16} color="#6b7280" />
          <Text style={styles.inputText}>{vehicle}</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NextScreen')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal for Members Selection */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Popup - Members</Text>
            
            <View style={styles.memberRow}>
              <Text style={styles.memberLabel}>Adults</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => setAdults(adults + 1)}>
                  <Text style={styles.counterButton}>+</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{adults}</Text>
                <TouchableOpacity onPress={() => setAdults(Math.max(adults - 1, 0))}>
                  <Text style={styles.counterButton}>-</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.memberRow}>
              <Text style={styles.memberLabel}>Children</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity onPress={() => setChildren(children + 1)}>
                  <Text style={styles.counterButton}>+</Text>
                </TouchableOpacity>
                <Text style={styles.counterText}>{children}</Text>
                <TouchableOpacity onPress={() => setChildren(Math.max(children - 1, 0))}>
                  <Text style={styles.counterButton}>-</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.doneButton} onPress={updateMembers}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal for Vehicle Selection */}
      <Modal visible={vehicleModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Popup - Vehicle</Text>
            <View style={styles.vehicleGrid}>
              {vehicles.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={[styles.vehicleButton, vehicle === item.name && styles.selectedVehicle]}
                  onPress={() => {
                    setVehicle(item.name);
                    setVehicleModalVisible(false);
                  }}
                >
                  <FontAwesome5 name={item.icon} size={40} color={vehicle === item.name ? "white" : "black"} />
                  <Text style={styles.vehicleText}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.doneButton} onPress={() => setVehicleModalVisible(false)}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#11132A',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 12,
  },
  inputText: {
    marginLeft: 10,
    color: '#1f2937',
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#5566FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  memberLabel: {
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: '#5566FF',
  },
  counterText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#5566FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  vehicleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    margin: 5,
  },
  selectedVehicle: {
    backgroundColor: '#5566FF',
  },
  vehicleText: {
    color: '#1f2937',
    fontSize: 14,
  },
});

export default MembersDateVehicleScreen;
