import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CeywayContext } from '../context/CeywayContext';


const SummaryScreen = ({navigation}) => {
  const {selectedItems,LocationData,fromDate,members,vehicle,toDate} = useContext(CeywayContext)

  const destinations = LocationData.filter(location => selectedItems.includes(location.id));
  const handleCreatePlan = () => {
      navigation.navigate('ProcessingScreen');
  };

  const handleMemberEdit= ()=>{

  }
    
  const handleSelectionEdit = ()=>{

  }



  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Summary</Text>
      </View>

      {/* Members, Date & Vehicle */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Members, Date & Vehicle</Text>
          <TouchableOpacity onPress={handleMemberEdit}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
        </View>
        <Text style={styles.infoText}>👤 {members}</Text>
        <Text style={styles.infoText}>🚗 {vehicle}</Text>
        <Text style={styles.infoText}>📅 {fromDate} - {toDate}</Text>
      </View>

      {/* Selected Destinations */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Selected destinations ({destinations.length})</Text>
          <TouchableOpacity onPress={handleSelectionEdit}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
        </View>
        <FlatList
          data={destinations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.destinationCard}>
              <Image source={item.image} style={styles.destinationImage} />
              <View>
                <Text style={styles.destinationName}>{item.title}</Text>
                <Text style={styles.destinationDetail}>• {item.distance}</Text>
                {/* <Text style={styles.destinationDetail}>• {item.time}</Text> */}
              </View>
            </View>
          )}
        />
      </View>

      {/* AI Processing Section */}
      <Text style={styles.aiText}>✨ Let's process your details and create a perfect travel plan with our smart AI.</Text>
      
      {/* Create Plan Button */}
      <TouchableOpacity style={styles.createPlanButton} onPress={handleCreatePlan}>
        <Text style={styles.createPlanText}>Create plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E2640', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10,marginTop:20 },
  headerText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  card: { backgroundColor: 'white', borderRadius: 10, padding: 15, marginBottom: 15 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  editText: { color: '#007BFF', fontSize: 14 },
  infoText: { fontSize: 14, marginTop: 5 },
  destinationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 10, marginVertical: 5 },
  destinationImage: { width: 50, height: 50, borderRadius: 10, marginRight: 10 },
  destinationName: { fontSize: 14, fontWeight: 'bold' },
  destinationDetail: { fontSize: 12, color: 'gray' },
  aiText: { color: 'white', textAlign: 'center', marginVertical: 15 },
  createPlanButton: { backgroundColor: '#7B61FF', padding: 15, borderRadius: 10, alignItems: 'center' },
  createPlanText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default SummaryScreen;
