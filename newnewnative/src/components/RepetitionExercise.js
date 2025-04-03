import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const RepetitionExercise = ({ route, navigation }) => {
  const { exercise, suggestedExercise, exercises } = route.params;
  const [count, setCount] = useState(0);
//utilizing code from previous lab
//buttons
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.count}>Reps: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="+1 Rep"
          buttonStyle={[styles.button, styles.startButton]}
          titleStyle={styles.buttonText}
          onPress={() => setCount(count + 1)}/>
        <Button
          title="-1 Rep"
          buttonStyle={[styles.button, styles.stopButton]}
          titleStyle={styles.buttonText}
          onPress={() => setCount(count > 0 ? count - 1 : 0)}/>
        <Button
          title="Reset"
          buttonStyle={[styles.button, styles.resetButton]}
          titleStyle={styles.buttonText}
          onPress={() => setCount(0)}/>
      </View>

      <View style={styles.navigationButtons}>
        {suggestedExercise && (
          <Button
            title={`Suggested: ${suggestedExercise.name}`}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => {
              navigation.navigate( suggestedExercise.type === 'Duration' ? 'DurationExercise' : 'RepetitionExercise',
                {exercise: suggestedExercise, suggestedExercise: exercises.find(ex => ex.id === suggestedExercise.suggestedId),
                  exercises: exercises, });}}/>
        )}
        <Button
          title="Home"
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
          onPress={() => navigation.navigate('Home')}
        />
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
    justifyContent: 'center',
    width: '100%',
    marginVertical: 20,
    gap: 10,
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
