import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
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

       {/*  <View style={styles.pagination}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View> */}

        <TouchableOpacity style={styles.button} onPress={GoToNextPage}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
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
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  button: {
    backgroundColor: '#4682B4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandingPage;
