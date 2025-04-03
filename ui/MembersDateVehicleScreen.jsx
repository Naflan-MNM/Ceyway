import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { CeywayContext } from '../context/CeywayContext';

const MembersDateVehicleScreen = ({ navigation }) => {
  const{adults,children,vehicle,fromDate,toDate,setAdults,setChildren,setVehicle,setFromDate,setToDate,members, setMembers} = useContext(CeywayContext)
  
  const [memberModalVisible, setmemberModalVisible] = useState(false);
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [selectedDates, setSelectedDates] = useState({});

  const handleDayPress = (day) => {
    let today = new Date().toISOString().split('T')[0];
    
    if (!fromDate || (fromDate && toDate)) {
      setFromDate(day.dateString);
      setToDate(null);
      let newSelected = { 
        [day.dateString]: { selected: true, startingDay: true, color: '#5566FF' } 
      };
  
      // Ensure today's date is always highlighted
      if (today !== day.dateString) {
        newSelected[today] = { marked: true, dotColor: 'red' };
      }
  
      setSelectedDates(newSelected);
    } else if (!toDate) {
      if (new Date(day.dateString) < new Date(fromDate)) {
        setToDate(fromDate);
        setFromDate(day.dateString);
      } else {
        setToDate(day.dateString);
      }
      
      let newSelected = {};
      let start = new Date(fromDate);
      let end = new Date(day.dateString);
      
      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        let dateStr = d.toISOString().split('T')[0];
        newSelected[dateStr] = { selected: true, color: '#5566FF' };
      }
  
      // Ensure today's date remains highlighted
      if (!newSelected[today]) {
        newSelected[today] = { marked: true, dotColor: 'red' };
      }
  
      setSelectedDates(newSelected);
    }
  };
  
  // Set initial selectedDates to include today's date
  useEffect(() => {
    let today = new Date().toISOString().split('T')[0];
    setSelectedDates({ [today]: { marked: true, dotColor: 'red' } });
  }, []);
  

  const updateMembers = () => {
    setMembers(`${adults} Adults, ${children} Children`);
    setmemberModalVisible(false);
  };

  const vehicles = [
    { name: 'Motorbike', icon: 'motorcycle' },
    { name: 'Three wheel', icon: 'car-side' },
    { name: 'Car', icon: 'car' },
    { name: 'Van', icon: 'shuttle-van' },
    { name: 'Bus', icon: 'bus' },
  ];

  const handleNext = () => {
    console.log(`members: ${members}, vehicle: ${vehicle}, date: ${fromDate} - ${toDate}`);
    navigation.navigate('SummaryScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Members, Date & Vehicle</Text>
      </View>
      <View style={styles.card}>
        <TouchableOpacity style={styles.inputBox} onPress={() => setmemberModalVisible(true)}>
          <FontAwesome5 name="user-friends" size={16} color="#6b7280" />
          <Text style={styles.inputText}>{members}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputBox} onPress={() => setDateModalVisible(true)}>
          <MaterialCommunityIcons name="calendar" size={16} color="#6b7280" />
          <Text style={styles.inputText}>{fromDate ? `${fromDate} - ${toDate || '?'}` : 'Select Dates'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.inputBox} onPress={() => setVehicleModalVisible(true)}>
          <FontAwesome5 name="car" size={16} color="#6b7280" />
          <Text style={styles.inputText}>{vehicle}</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Members Modal */}
      <Modal visible={memberModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Members</Text>

            {/* Adults Counter */}
            <View style={styles.memberRow}>
              <Text style={styles.memberLabel}>Adults</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  style={styles.counterButton} 
                  onPress={() => setAdults(Math.max(adults - 1, 1))}
                >
                  <Text style={styles.counterText}>➖</Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{adults}</Text>
                <TouchableOpacity 
                  style={styles.counterButton} 
                  onPress={() => setAdults(adults + 1)}
                >
                  <Text style={styles.counterText}>➕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Children Counter */}
            <View style={styles.memberRow}>
              <Text style={styles.memberLabel}>Children</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity 
                  style={styles.counterButton} 
                  onPress={() => setChildren(Math.max(children - 1, 0))}
                >
                  <Text style={styles.counterText}>➖</Text>
                </TouchableOpacity>
                <Text style={styles.countText}>{children}</Text>
                <TouchableOpacity 
                  style={styles.counterButton} 
                  onPress={() => setChildren(children + 1)}
                >
                  <Text style={styles.counterText}>➕</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Done Button */}
            <TouchableOpacity style={styles.doneButton} onPress={updateMembers}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker Modal */}
      <Modal visible={dateModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Calendar markingType={'period'} markedDates={selectedDates} onDayPress={handleDayPress} />
            <TouchableOpacity style={styles.doneButton} onPress={() => setDateModalVisible(false)}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

       {/* Modal for Vehicle Selection */}
       <Modal visible={vehicleModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Vehicle</Text>
            <View style={styles.vehicleGrid}>
              {vehicles.map((item) => (
                <TouchableOpacity
                  key={item.name}
                  style={[styles.vehicleButton, vehicle === item.name && styles.selectedVehicle]}
                  onPress={() => {
                    setVehicle(item.name);
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
  container: { flex: 1, backgroundColor: '#11132A', padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom:10, marginTop:20 },
  headerText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 16 },
  inputBox: { flexDirection: 'row', alignItems: 'center', padding: 14, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, marginBottom: 12 },
  inputText: { marginLeft: 10, color: '#1f2937', fontSize: 16 },
  button: { marginTop: 20, backgroundColor: '#5566FF', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: '80%' },
  doneButton: {
    marginTop: 20,
    backgroundColor: '#5566FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  memberRow: {
    flexDirection: 'row',
    borderWidth: 1, 
    borderColor: '#e5e7eb',
    borderRadius: 10,
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10, 
  },
  memberLabel: {
    fontSize: 16,
  },
  counterContainer: {
    flexDirection: 'row',
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
