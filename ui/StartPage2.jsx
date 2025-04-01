import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CeywayContext } from '../context/CeywayContext';
import RenderItem from '../components/RenderItem';

const StartPage2 = ({ navigation }) => {
  const { jaffnaData, onTheWayData, selectedItems, toggleSelection } = useContext(CeywayContext);
  const [activeTab, setActiveTab] = useState('Destinations');


  const handleNext = () => {
    console.log(selectedItems);
    navigation.navigate('MembersDateVehicleScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Destinations</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Destinations' && styles.activeTab]}
          onPress={() => setActiveTab('Destinations')}
        >
          <Text style={activeTab === 'Destinations' ? styles.activeTabText : styles.tabText}>
            Destinations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'OnTheWay' && styles.activeTab]}
          onPress={() => setActiveTab('OnTheWay')}
        >
          <Text style={activeTab === 'OnTheWay' ? styles.activeTabText : styles.tabText}>
            On The Way
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.selectionText}>{selectedItems.length} destinations selected. (Select destinations)</Text>
      
      <FlatList
        data={activeTab === 'Destinations' ? jaffnaData : onTheWayData}
        renderItem={({ item }) => (
          <RenderItem item={item} selectedItems={selectedItems} toggleSelection={toggleSelection} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
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
    marginBottom: 12,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2D48',
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#5566FF',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabText: {
    color: '#B0B3D6',
  },
  selectionText: {
    color: '#B0B3D6',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    marginTop: 16,
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
});

export default StartPage2;
