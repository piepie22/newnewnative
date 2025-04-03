import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

  ///buttons - using touchableopacity
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <Text style={styles.timer}>{formatTime(time)}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.startButton]}
          onPress={() => setIsRunning(true)}
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.stopButton]}
          onPress={() => setIsRunning(false)}
        >
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={() => {
            setIsRunning(false);
            setTime(0);
          }}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationButtons}>
        {suggestedExercise && (<TouchableOpacity style={styles.button}
            onPress={() => { navigation.navigate( suggestedExercise.type === 'duration' ? 'DurationExercise' : 'RepetitionExercise',
                { exercise: suggestedExercise,
                  suggestedExercise: exercises.find(ex => ex.id === suggestedExercise.suggestedId),
                  exercises: exercises,});}}>
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

//css like my previous one
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

export default DurationExercise;
