import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FooterNavigation = ({ navigation }) => {
  const GoToStartPage = () => {
    navigation.navigate('StartPage');
  };
  /*
  const GoToStoryPage = () => {
    navigation.navigate('StoryPage');
  }; */
  const GoToSavePage = () => {
    navigation.navigate('SavePage');
  };
  const GoToProfilePage = () => {
    navigation.navigate('ProfilePage');
  };
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.footerButton}>
          <Ionicons name="home-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={GoToStartPage}>
          <Ionicons name="map-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>New Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={GoToSavePage}>
          <Ionicons name="heart-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={GoToProfilePage}>
          <Ionicons name="person-outline" size={24} color="#fff" />
          <Text style={styles.footerText}>Profile</Text>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1A1A2E',
    paddingVertical: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#000',
    marginTop: 4,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
});

export default FooterNavigation;
