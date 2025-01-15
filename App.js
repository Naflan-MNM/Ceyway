import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LandingPage from './ui/LandingPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import OpenPage2 from './ui/OpenPage2';
import StartPage from './ui/StartPage';
import StartPage2 from './ui/StartPage2';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LandingPage'>
        <Stack.Screen 
          name="LandingPage" 
          component={LandingPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="OpenPage2" 
          component={OpenPage2} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="StartPage" 
          component={StartPage} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="StartPage2" 
          component={StartPage2} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}