import React from 'react';
import { View, StyleSheet } from 'react-native';
import StartPage2 from './StartPage2';
import FooterNavigation from '../components/FooterNavigation';

const MainStartPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <StartPage2 />
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
