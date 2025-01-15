import React from 'react'
import { StyleSheet,View,Text,ImageBackground } from 'react-native'

const LandingPage = () => {
  return (
    <View style={styles.view}>
      <ImageBackground
        source={require('../assets/images/bg2.jpg')} // Replace with the correct path to your image
        style={styles.bgimg}
      >
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bgimg: {
    opacity: 0.8,
    resizeMode: 'contain', 
    width: '100%', 
    height: '100%',
  },/* 
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20, 
    alignItems: 'center',
    justifyContent: 'center',

  }, */
  text: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20, 
    fontSize: 18,
    color: 'black',
  },
});
export default LandingPage
