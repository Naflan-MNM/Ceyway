import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LandingPage from './ui/LandingPage';
import OpenPage2 from './ui/OpenPage2';
import StartPage from './ui/StartPage';
import MainStartPage from './ui/MainStartPage';
import StoryPage from './ui/StoryPage';
import SavePage from './ui/SavePage';
import ProfilePage from './ui/ProfilePage';
import CustomPlanePage from './ui/CustomPlanePage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
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
          name="MainStartPage"
          component={MainStartPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomPlanePage"
          component={CustomPlanePage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="StoryPage" component={StoryPage} />
        <Stack.Screen name="SavePage" component={SavePage} />
        <Stack.Screen name="ProfilePage" component={ProfilePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
