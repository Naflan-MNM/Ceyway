import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import CheckBox from 'react-native-checkbox';



const StartPage2 = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const toggleSelection = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const data = [
    { id: '1', title: 'Nallur Kovil', location: 'Jaffna', distance: '4 km' },
    { id: '2', title: 'Point Pedro', location: 'Jaffna', distance: '14 km' },
    { id: '3', title: 'Nagadeepa Vihara', location: 'Jaffna', distance: '32 km' },
    { id: '4', title: 'Casuarina Beach', location: 'Jaffna', distance: '28 km' },
    { id: '5', title: 'Jaffna Fort', location: 'Jaffna', distance: '2 km' },
    { id: '6', title: 'Jaffna Library', location: 'Jaffna', distance: '1.5 km' },
    { id: '7', title: 'Delft Island', location: 'Jaffna', distance: '35 km' },
  ];

  const onTheWayData = [
    { id: '8', title: 'Muruthan Lake', location: 'On the way', distance: '10 km' },
    { id: '9', title: 'Nanthi Kadal', location: 'On the way', distance: '15 km' },
    { id: '10', title: 'Redcliff', location: 'On the way', distance: '22 km' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://via.placeholder.com/60' }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.distance}>{item.distance}</Text>
      </View>
      <CheckBox
        value={selectedItems.includes(item.id)}
        onValueChange={() => toggleSelection(item.id)}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Jaffna</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.heading}>On the way to Jaffna</Text>
      <FlatList
        data={onTheWayData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  distance: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0099ff',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StartPage2;
