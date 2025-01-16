import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import StartPage from '../ui/StartPage';
import StoryPage from '../ui/StoryPage';
import SavePage from '../ui/SavePage';
import ProfilePage from '../ui/ProfilePage';

const FooterNavigation = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(StartPage)}>
        <Icon name="home-outline" size={24} color="#000" />
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(StartPage)}>
        <Icon name="search-outline" size={24} color="#000" />
        <Text style={styles.navText}>Search</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(StoryPage)}>
        <Icon name="heart-outline" size={24} color="red" />
        <Text style={styles.navText}>Story</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(SavePage)}>
        <Icon name="bookmark-outline" size={24} color="#000" />
        <Text style={styles.navText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(ProfilePage)}>
        <Icon name="person-outline" size={24} color="#000" />
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
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
});

export default FooterNavigation;
