import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>SignIn</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
  },
  texto: {
    color: 'red',
    fontSize: 30,
  },
});
