import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const OpenPage2 = ({navigation}) => {

  const GoToStartPage = () => {
    navigation.navigate('StartPage');
  };
  return (
    <ImageBackground
      source={require('../assets/images/bg1.jpg')}
      style={styles.background}
    >
      <StatusBar 
        backgroundColor="green" 
        barStyle="light-content"
      />
      <View style={styles.overlay}>
        {/* Title */}
        <Text style={styles.title}>Sri Lanka No 1 Guider</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>Ready to explore</Text>

        {/* Disabled Button */}
        <TouchableOpacity style={styles.button} onPress={GoToStartPage}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
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
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    textAlign: 'center',
    paddingBottom: 70,
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#4682B4',
    width: '80%',
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

export default OpenPage2;
