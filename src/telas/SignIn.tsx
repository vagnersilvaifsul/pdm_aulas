import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignIn({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <>
          <Image source={require('../assets/logo512.png')} />
          <TextInput label="Email" mode="outlined" placeholder="Digite seu email" />
          <TextInput label="senha" mode="outlined" placeholder="Digite sua senha" />
          <Text>Esqueceu sua senha?</Text>
          <Button onPress={() => navigation.navigate('Home')}>Engtrar</Button>
          <Text>Cadastrar-se?</Text>
        </>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  texto: {
    color: 'red',
    fontSize: 30,
  },
});
