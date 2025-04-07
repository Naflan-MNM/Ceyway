import React, { useState,useContext } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FooterNavigation from '../components/FooterNavigation';
import { CeywayContext } from '../context/CeywayContext';

const StartPage = ({ navigation, route  }) => {

  const { setJaffnaData, setOnTheWayData } = useContext(CeywayContext);

  const [currentLocation, setCurrentLocation] = useState('');
  const [destination, setDestination] = useState('');
/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
  /* if you complete the setup of trending destinatinos then follow this
  but it not mendatory to compmlete those setup to do this */
  /* this setup requesting destinatin, on the way destinations  */

  const GoToStartPage2 = () => {
    navigation.navigate('DestinationsScreen');
  };

  /* 
  here this function for reqesting destinations and onthe way destinations
  after uncomment this you have to comment above function and then gotothe ceywayContext.jsx file and uncomment the 
  const [jaffnaData, setJaffnaData] = useState([]);
  const [onTheWayData, setOnTheWayData] = useState([]);
  this 2 state and comment the filter logic of the jaffnaData and onTheWayData

   */
/* 

const GoToStartPage2 = async () => {
  if (!currentLocation || !destination) return;

  try {
    // Fetch destination attractions
    const destinationRes = await fetch(`http://localhost:8080/api/travel-app/get-attractions/${destination}`);
    const destinationData = await destinationRes.json();

    // Fetch on-the-way attractions
    const onTheWayRes = await fetch(`http://localhost:8080/api/travel-app/get-ontheway-attractions/${currentLocation}/${destination}`);
    const onTheWayData = await onTheWayRes.json();

    // Set in context
    setJaffnaData(destinationData);
    setOnTheWayData(onTheWayData);

    navigation.navigate('DestinationsScreen');
  } catch (err) {
    console.error('Failed to fetch travel data:', err);
  }
}; */

/* --------------------------------------------------------ending the setup of requesting ontheway , destinations location information -------------------------------------------------------------------------------------------------------------------------------------------------------- */


/* ----------------------------------------------starting the section for handling the setup of trending destinations -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

  /* after completing the setup of login page then you have to uncomment this, and comment mokedata*/
  /* const trendingDestinations = route.params?.trendingDestinations || []; */

  /* Additional Note:
      Make sure your backend returns the image as a URL, not a static file path. If you're sending image paths, your mobile app won't display them unless you host them correctly (e.g., http://localhost:8080/images/ella.jpg).
  */
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
  /* -------------------------------------------ending the setup for handling trending destinations ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

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

        <TouchableOpacity style={styles.findButton}>
          <Text style={styles.findButtonText} onPress={GoToStartPage2}>Find Destinations</Text>
        </TouchableOpacity>
      </View>

      {/* Trending Destinations Section */}
      <Text style={styles.sectionTitle}>Explore Trending Destinations in Sri Lanka</Text>
      <FlatList
        data={trendingDestinations}
        vertical
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
