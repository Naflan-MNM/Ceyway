import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ItemCard = ({ data, isSelected, toggleSelection }) => {
  return (
    <TouchableOpacity onPress={() => toggleSelection(data.id)} style={[styles.card, isSelected ? styles.selectedCard : null]}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.description}>{data.description}</Text>
        <Text style={styles.details}>Distance: {data.distance}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    card: { padding: 16, margin: 10, borderRadius: 10, backgroundColor: '#f5f5f5', elevation: 2 },
    selectedCard: { backgroundColor: '#d4f1f4' },
    title: { fontSize: 16, fontWeight: 'bold' },
    description: { fontSize: 14, color: '#555' },
    details: { fontSize: 12, color: '#999' },
});

export default ItemCard
