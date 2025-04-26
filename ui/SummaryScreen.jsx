import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CeywayContext } from '../context/CeywayContext';

const SummaryScreen = ({ navigation }) => {
  const {
    selectedItems,
    destinationData,
    onTheWayData,
    fromDate,
    toDate,
    members,
    vehicle,
    LOCAL_IP
  } = useContext(CeywayContext);

  const destinations = destinationData.filter(location => selectedItems.includes(Number(location.id)));
  const onTheWayDestinations = onTheWayData.filter(location => selectedItems.includes(Number(location.id)));

  console.log('Filtered Destinations:', destinations);
  console.log('Filtered OnTheWayDestinations:', onTheWayDestinations);
  


  /* const handleCreatePlan = () => {
    navigation.navigate('ProcessingScreen');
  }; */
  const handleCreatePlan = async () => {
    const selectedAttractionsNames = destinations.map(item => item.name);
    const selectedOnTheWayNames = onTheWayDestinations.map(item => item.name);
    // Navigate to processing screen first
    navigation.navigate('ProcessingScreen');

  try {
    const response = await fetch(`http://${LOCAL_IP}:8080/api/travel-app/generate-trip-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        /* members: members,
        vehicle: vehicle,
        dates: {
          start: fromDate,
          end: toDate,
        } */
        start: "Anuradhapura",
        destination: "Trincomalee",
        selectedOnTheWay: selectedOnTheWayNames,
        selectedAttractions: selectedAttractionsNames
      }),
    });

    const data = await response.json();
    console.log(data);
    // Add slight delay to simulate processing screen (optional)
    setTimeout(() => {
      navigation.replace('PlanByAIScreen', { planData: data });
    }, 1500);
  } catch (error) {
    console.error('Error creating plan:', error);
    // Optionally show error or retry option
  }
}; 

  const handleMemberEdit = () => {};
  const handleSelectionEdit = () => {};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Summary</Text>
      </View>

      {/* Member, Date, Vehicle Info */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>Members, Date & Vehicle</Text>
          <TouchableOpacity onPress={handleMemberEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>👤 {members}</Text>
        <Text style={styles.infoText}>🚗 {vehicle}</Text>
        <Text style={styles.infoText}>📅 {fromDate} - {toDate}</Text>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>

        {/* Jaffna Destinations */}
        {destinations.length > 0 && (
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>Destinations ({destinations.length})</Text>
              <TouchableOpacity onPress={handleSelectionEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            {destinations.map((item) => (
              <View key={item.id} style={styles.destinationCard}>
                <Image source={item.image} style={styles.destinationImage} />
                <View>
                  <Text style={styles.destinationName}>{item.title}</Text>
                  <Text style={styles.destinationDetail}>• {item.location}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* On the Way Destinations */}
        {onTheWayDestinations.length > 0 && (
          <View style={styles.card}>
            <View style={styles.rowBetween}>
              <Text style={styles.cardTitle}>On the Way Destinations ({onTheWayDestinations.length})</Text>
              <TouchableOpacity onPress={handleSelectionEdit}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            {onTheWayDestinations.map((item) => (
              <View key={item.id} style={styles.destinationCard}>
                <Image source={item.image} style={styles.destinationImage} />
                <View>
                  <Text style={styles.destinationName}>{item.title}</Text>
                  <Text style={styles.destinationDetail}>• {item.location}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* AI Prompt */}
        <Text style={styles.aiText}>
          ✨ Let's process your details and create a perfect travel plan with our smart AI.
        </Text>

        {/* Create Plan Button */}
        <TouchableOpacity style={styles.createPlanButton} onPress={handleCreatePlan}>
          <Text style={styles.createPlanText}>Create plan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1E2640', padding: 20, paddingTop: 40 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  headerText: { color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  scrollArea: {
    paddingBottom: 30,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold' },
  editText: { color: '#007BFF', fontSize: 14 },
  infoText: { fontSize: 14, marginTop: 5 },
  destinationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  destinationImage: { width: 50, height: 50, borderRadius: 10, marginRight: 10 },
  destinationName: { fontSize: 14, fontWeight: 'bold' },
  destinationDetail: { fontSize: 12, color: 'gray' },
  aiText: { color: 'white', textAlign: 'center', marginVertical: 15 },
  createPlanButton: {
    backgroundColor: '#7B61FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  createPlanText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default SummaryScreen;
