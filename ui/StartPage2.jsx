import React, { useContext, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { CeywayContext } from '../context/CeywayContext';
import RenderItem from '../components/RenderItem';


const StartPage2 = ({navigation}) => {
  const { jaffnaData, onTheWayData,selectedItems,toggleSelection } = useContext(CeywayContext);
  
  const heandleContinue = () => {
    console.log(selectedItems);
    navigation.navigate('CustomPlanePage');
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Jaffna</Text>
      <FlatList
        data={jaffnaData}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      <Text style={styles.heading}>On the way to Jaffna</Text>
      <FlatList
        data={onTheWayData}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            selectedItems={selectedItems}
            toggleSelection={toggleSelection}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
       <TouchableOpacity style={styles.button} onPress={heandleContinue}>
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
