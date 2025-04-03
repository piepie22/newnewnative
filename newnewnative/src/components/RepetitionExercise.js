import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RepetitionExercise = ({ route, navigation }) => {
  const { exercise, suggestedExercise, exercises } = route.params;
  const [count, setCount] = useState(0);

  // buttons - touchableopacity utilizing code from previous lab
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.count}>Reps: {count}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.startButton]} onPress={() => setCount(count + 1)}>
        <Text style={styles.buttonText}>+1 Rep</Text></TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.stopButton]} onPress={() => setCount(count > 0 ? count - 1 : 0)}>
        <Text style={styles.buttonText}>-1 Rep</Text></TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={() => setCount(0)}>
        <Text style={styles.buttonText}>Reset</Text></TouchableOpacity></View>

      <View style={styles.navigationButtons}> 
        {suggestedExercise && ( <TouchableOpacity style={styles.button}
            onPress={() => { navigation.navigate(  suggestedExercise.type === 'Duration' ? 'DurationExercise' : 'RepetitionExercise', 
                { exercise: suggestedExercise,
                  suggestedExercise: exercises.find(ex => ex.id === suggestedExercise.suggestedId), exercises: exercises,});}}>
            <Text style={styles.buttonText}>Suggested: {suggestedExercise.name}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  ); 
};

// css like my other one
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  exerciseName: {
    fontFamily: 'Arial',
    fontSize: 35,
    color: '#333',
    marginBottom: 20,
  },
  count: {
    fontSize: 30,
    fontFamily: 'Arial',
    color: '#000',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 20,
  },
  navigationButtons: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: '#A7C7E7',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#00A36C',
  },
  stopButton: {
    backgroundColor: '#A42A04',
  },
  resetButton: {
    backgroundColor: '#ADD8E6',
  },
  buttonText: {
    fontFamily: 'Arial',
    fontSize: 16,
    color: '#000',
  },
});

export default RepetitionExercise;
