import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

//mixing from module vids and code I have from previous lab
const DurationExercise = ({ route, navigation }) => {
  const { exercise, suggestedExercise, exercises } = route.params;
  const [time, setTime] = useState(0); 
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10); 
      }, 10);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);
  
  const formatTime = (time) => {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
  };

  //buttons
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start"
          buttonStyle={[styles.button, styles.startButton]}
          titleStyle={styles.buttonText}
          onPress={() => setIsRunning(true)}/>
        <Button
          title="Stop"
          buttonStyle={[styles.button, styles.stopButton]}
          titleStyle={styles.buttonText}
          onPress={() => setIsRunning(false)}/>
        <Button
          title="Reset"
          buttonStyle={[styles.button, styles.resetButton]}
          titleStyle={styles.buttonText}
          onPress={() => {
            setIsRunning(false);
            setTime(0);}}/>
      </View>

      <View style={styles.navigationButtons}>
        {suggestedExercise && (
          <Button
            title={`Suggested: ${suggestedExercise.name}`}
            buttonStyle={styles.button}
            titleStyle={styles.buttonText}
            onPress={() => { navigation.navigate( suggestedExercise.type === 'Duration' ? 'DurationExercise' : 'RepetitionExercise',
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

// css like my previous one
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
  timer: {
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

export default DurationExercise;
