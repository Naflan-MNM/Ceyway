import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './ui/LandingPage';

export default function App() {
  return (
    <View style={styles.container}>
      <LandingPage/>
      <StatusBar 
        backgroundColor='#80a326'/* style="auto" */ />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
