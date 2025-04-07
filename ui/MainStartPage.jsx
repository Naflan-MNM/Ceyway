import React from 'react';
import { View, StyleSheet } from 'react-native';
import DestinationsScreen from './DestinationsScreen';
import FooterNavigation from '../components/FooterNavigation';




/* 












































not in use not in use































 */
const MainStartPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <DestinationsScreen navigation={navigation}/>
        <View style={styles.footer}>
        <FooterNavigation navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f8f9fa', 
  },
  footer: {
    height: 60, 
    backgroundColor: '#ffffff', 
    borderTopWidth: 1, 
    borderColor: '#ddd', 
    justifyContent: 'center',
  },
});

export default MainStartPage;
