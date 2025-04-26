import { useContext } from 'react';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CeywayContext } from '../context/CeywayContext';
import { CheckBox } from 'react-native-elements';

const RenderItem = ({ item }) => {
  const { toggleSelection, selectedItems } = useContext(CeywayContext);

  return (
    <View style={styles.card}>
      <Image source={item.imagePath} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.location}>{item.district}</Text>
        <Text style={styles.distance}>{item.category}</Text>
      </View>
      <CheckBox
        checked={selectedItems.includes(item.id)} // Use 'checked' with a boolean value
        onPress={() => toggleSelection(item.id)}  // Use 'onPress' to toggle the selection
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginVertical: 3,
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
});

export default RenderItem;
