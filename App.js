import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [secretNumber, setSecretNumber] = useState('');
  const [guessedNumber, setGuessedNumber] = useState('');
  const [status, setStatus] = useState('No guesses yet');
  const [guesses, setGuesses] = useState(0);
  const [gameStopped, setGameStopped] = useState(true);

  const ref_guessInput = useRef()

  const randomizeSecretNumber = () => {
    setSecretNumber(Math.floor(Math.random() * 100 + 1))
  };
  const guessNumber = (number) => {
    setGuessedNumber(parseInt(number))
  };
  const checkGuess = () => {
    setGuesses(guesses + 1);
    if (guessedNumber < secretNumber) {
      setStatus('Your guess ' + guessedNumber + ' is too low');
    }else if (guessedNumber > secretNumber) {
      setStatus('Your guess ' + guessedNumber + ' is too high');
    }else if (guessedNumber === secretNumber) {
      setStatus('Secret number was ' + secretNumber);
      alert('Your guess ' + guessedNumber + ' is correct. You needed ' + guesses + ' guesses');
      setGameStopped(true);
      ref_guessInput.current.clear();
    }
  }
  const reset = () => {
    randomizeSecretNumber();
    setGuessedNumber(0);
    setStatus('No guesses yet');
    setGuesses(0);
    setGameStopped(false);
  }

  return (
    <View style={styles.container}>
      <Text>Guess a whole number in the range 1 - 100</Text>
      <Button onPress={reset} title='Start/reset'/>
      <TextInput 
        style={styles.guessInput}
        keyboardType='numeric'
        onChangeText={number => guessNumber(number)}
        ref={ref_guessInput}
      />
      <Button disabled={gameStopped} onPress={checkGuess} title='Make Guess'/>
      <Text>{status}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  guessInput: {
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginVertical: 10,
  },
});
