import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DurationExercise from './src/components/DurationExercise';
import RepetitionExercise from './src/components/RepetitionExercise';
import HomeScreen from './src/components/Home';  

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen
          name="RepetitionExercise"
          component={RepetitionExercise}
          options={{ title: 'Repetition Exercise' }}
        />
        <Stack.Screen
          name="DurationExercise"
          component={DurationExercise}
          options={{ title: 'Duration Exercise' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
