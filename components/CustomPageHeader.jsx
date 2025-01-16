import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomPageHeader = () => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>Custom Your Plane</Text>
            <View style={styles.tabs}>
                <Text style={styles.tab}>Persons</Text>
                <Text style={styles.tab}>Vehicle</Text>
                <Text style={styles.tab}>Date & Time</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: { padding: 16, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    tabs: { flexDirection: 'row', justifyContent: 'space-around' },
    tab: { fontSize: 14, color: '#007AFF' },
});

export default CustomPageHeader
