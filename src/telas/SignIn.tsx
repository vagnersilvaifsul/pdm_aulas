import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SignIn({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <>
          <Image style={styles.image} source={require('../assets/logo512.png')} />
          <TextInput
            style={styles.textinput}
            label="Email"
            mode="outlined"
            placeholder="Digite seu email"
          />
          <TextInput
            style={styles.textinput}
            label="senha"
            mode="outlined"
            placeholder="Digite sua senha"
          />
          <Text style={styles.textEsqueceuSenha}>Esqueceu sua senha?</Text>
          <Button style={styles.button} onPress={() => navigation.navigate('Home')}>
            Engtrar
          </Button>
          <View style={styles.divCadastro}>
            <Text style={styles.textCadastro}>Cadastrar-se?</Text>
          </View>
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
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 200 / 2,
    marginTop: 100,
    marginBottom: 40,
  },
  textinput: {
    width: 350,
    height: 50,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  textEsqueceuSenha: {
    alignSelf: 'flex-end',
  },
  textCadastro: {},
  button: {
    marginTop: 50,
    marginBottom: 30,
  },
  divCadastro: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
