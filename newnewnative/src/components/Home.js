import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements'; 

const Home = ({ navigation }) => {

  const exercises = [
    { id: '1', name: 'Push Ups', type: 'Repetition', suggestedId: '2' },
    { id: '2', name: 'Running', type: 'Duration', suggestedId: '1' },
    { id: '3', name: 'Planks', type: 'Duration', suggestedId: '4' },
    { id: '4', name: 'Swimming', type: 'Repetition', suggestedId: '3' },
  ];

  const renderItem = ({ item }) => (
    <Button
      title={item.name}
      buttonStyle={styles.button}
      titleStyle={styles.buttonText}  
      onPress={() => {
        const suggestedExercise = exercises.find(ex => ex.id === item.suggestedId);
        navigation.navigate(`${item.type}Exercise`, {
          exercise: item,
          suggestedExercise: suggestedExercise,
          exercises: exercises,
        });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}  
      />
    </View>
  );
};

// css similar to my other one
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 35,
    fontFamily: 'Arial',
    color: '#000',  
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A7C7E7',  
    marginVertical: 5,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',  
    fontSize: 18,
  },
});

export default Home;
