import React, {useContext, useEffect, useState} from 'react';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../context/AuthProvider';
import {Credencial} from '../model/types';

export default function SignIn({navigation}: any) {
  const theme = useTheme();
  const [credencial, setCredencial] = useState<Credencial>({
    email: '',
    senha: '',
  });
  const {signIn} = useContext<any>(AuthContext);

  useEffect(() => {
    console.log('Credencial', credencial);
  });

  async function entrar() {
    console.log('Entrar', credencial);
    const mensagem = await signIn(credencial);
    if (mensagem === 'ok') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', mensagem);
    }
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: theme.colors.background,
      }}>
      <ScrollView>
        <>
          <Image style={styles.image} source={require('../assets/logo512.png')} />
          <TextInput
            style={styles.textinput}
            value={credencial.email}
            onChangeText={t => setCredencial({...credencial, email: t})}
            autoCapitalize="none"
            mode="outlined"
            label="Email"
            placeholder="Digite seu email"
            right={<TextInput.Icon icon="email" />}
          />
          <TextInput
            style={styles.textinput}
            value={credencial.senha}
            onChangeText={t => setCredencial({...credencial, senha: t})}
            autoCapitalize="none"
            mode="outlined"
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry
            right={<TextInput.Icon icon="eye" />}
          />
          <Text style={styles.textEsqueceuSenha}>Esqueceu sua senha?</Text>
          <Button style={styles.button} mode="contained" onPress={entrar}>
            Entrar
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
