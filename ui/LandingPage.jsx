import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground,StatusBar } from 'react-native';
import { CeywayContext } from '../context/CeywayContext'; 

const LandingPage = ({ navigation }) => {
  const {data} = useContext(CeywayContext);

  const GoToNextPage = () => {
    navigation.navigate('OpenPage2');
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg2.jpg')}
      style={styles.background}
    >
      <StatusBar backgroundColor="green" barStyle="light-content" />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to CEYWAY</Text>
        <View style={{ backgroundColor: '#212843', padding: 15, borderRadius: 10, marginLeft: 20, marginRight: 20 }}>
          <Text style={{ color: '#ccdbf1', fontSize: 20, fontWeight: 'bold',marginBottom:10}}>Discover Sri Lanka, Your Way!</Text>
          <Text style={{ color: 'white', fontSize: 12}}>From breathtaking beaches to cultural wonders, Ceyway’s AI-powered travel planner makes it easy to explore the best of Sri Lanka. Let’s get started!</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <View style={styles.pagination}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
            <TouchableOpacity style={styles.button} onPress={GoToNextPage}>
          
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#ccdbf1',
    marginHorizontal: 2,
  },
  activeDot: {
    width: 15,
  },
  button: {
    backgroundColor: '#555de3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingPage;
