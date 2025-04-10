import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterNavigation from '../components/FooterNavigation';
import { CeywayContext } from '../context/CeywayContext';

const StartPage = ({ navigation }) => {
  const { setJaffnaData, setOnTheWayData } = useContext(CeywayContext);

  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');

  // ✅ Replace this with your machine's local IP address (same Wi-Fi as mobile)
  const LOCAL_IP = '192.168.43.77';//or 192.168.43.53 // <<<<< REPLACE THIS IP

  const GoToStartPage2 = async () => {
    /* if (!currentLocation || !destination) return; */ 

    try {
      const destinationRes = await fetch(`http://${LOCAL_IP}:8080/api/travel-app/get-attractions/Anuradhapura`);
      if (!destinationRes.ok) throw new Error('Destination fetch failed');
      const destinationData = await destinationRes.json();

      const onTheWayRes = await fetch(`http://${LOCAL_IP}:8080/api/travel-app/get-ontheway-attractions/Trincomalee/Anuradhapura`);
      if (!onTheWayRes.ok) throw new Error('On-the-way fetch failed');
      const onTheWayData = await onTheWayRes.json();

      setJaffnaData(destinationData);
      setOnTheWayData(onTheWayData);

      navigation.navigate('DestinationsScreen');
    } catch (err) {
      console.error('Failed to fetch travel data:', err);
      Alert.alert('Error', 'Unable to fetch travel data. Please try again later.');
    }
  };

  const trendingDestinations = [
    {
      id: '1',
      title: 'Ella Sri Lanka',
      description: "Ella is not just a destination; it's a journey into nature's heart.",
      image: require('../assets/images/ella.jpg'),
    },
    {
      id: '2',
      title: 'Casuarina Beach',
      description: 'Casuarina Beach where the horizon meets tranquility.',
      image: require('../assets/images/casuarina.jpg'),
    },
    {
      id: '3',
      title: 'Horton Plains',
      description: 'Step into Horton Plains, where nature whispers its secrets.',
      image: require('../assets/images/horton.jpg'),
    },
    {
      id: '4',
      title: 'Knuckles Mountain Range',
      description: 'Find serenity in the misty peaks of the Knuckles Range.',
      image: require('../assets/images/knuckles.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Where do you want to go?</Text>
      </View>

      {/* Location Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Location</Text>
        <View style={styles.inputBox}>
          <Ionicons name="location-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Your location"
            placeholderTextColor="#888"
            value={currentLocation}
            onChangeText={setCurrentLocation}
          />
        </View>

        <Text style={styles.label}>Destination</Text>
        <View style={styles.inputBox}>
          <Ionicons name="navigate-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Where to go?"
            placeholderTextColor="#888"
            value={destination}
            onChangeText={setDestination}
          />
        </View>

        <TouchableOpacity style={styles.findButton} onPress={GoToStartPage2}>
          <Text style={styles.findButtonText}>Find Destinations</Text>
        </TouchableOpacity>
      </View>

      {/* Trending Destinations Section */}
      <Text style={styles.sectionTitle}>Explore Trending Destinations in Sri Lanka</Text>
      <FlatList
        data={trendingDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardList}
      />

      <FooterNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  header: {
    marginTop: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputContainer: {
    padding: 15,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginLeft: 5,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  findButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },
  findButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginVertical: 10,
  },
  cardList: {
    paddingLeft: 15,
    paddingRight: 15,
    gap: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default StartPage;
