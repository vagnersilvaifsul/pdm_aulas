import {yupResolver} from '@hookform/resolvers/yup';
import React, {useContext, useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as yup from 'yup';
import {AuthContext} from '../context/AuthProvider';
import {Credencial} from '../model/types';

const requiredMessage = 'Campo obrigatório';

/*
  /^
  (?=.*\d)              // deve conter ao menos um dígito
  (?=.*[a-z])           // deve conter ao menos uma letra minúscula
  (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
  (?=.*[$*&@#])         // deve conter ao menos um caractere especial
  [0-9a-zA-Z$*&@#]{8,}  // deve conter ao menos 8 dos caracteres mencionados
$/
*/
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required(requiredMessage)
      .matches(/\S+@\S+\.\S+/, 'Email inválido'),
    senha: yup
      .string()
      .required(requiredMessage)
      .matches(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
        'A senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um númeral, um caractere especial e um total de 8 caracteres',
      ),
  })
  .required();

export default function SignIn({navigation}: any) {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    defaultValues: {
      email: '',
      senha: '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const {signIn} = useContext<any>(AuthContext);

  useEffect(() => {
    console.log('renderizou');
  });

  async function entrar(data: Credencial) {
    console.log(JSON.stringify(data));
    const mensagem = await signIn(data);
    if (mensagem === 'ok') {
      navigation.navigate('AppStack');
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
          <Image style={styles.image} source={require('../assets/images/logo512.png')} />
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                autoCapitalize="none"
                mode="outlined"
                label="Email"
                placeholder="Digite seu email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={<TextInput.Icon icon="email" />}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.email?.message?.toString()}
            </Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textinput}
                autoCapitalize="none"
                mode="outlined"
                label="Senha"
                placeholder="Digite sua senha"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                right={<TextInput.Icon icon="eye" />}
              />
            )}
            name="senha"
          />
          {errors.senha && (
            <Text style={{...styles.textError, color: theme.colors.error}}>
              {errors.senha?.message?.toString()}
            </Text>
          )}

          <Text style={styles.textEsqueceuSenha}>Esqueceu sua senha?</Text>
          <Button style={styles.button} mode="contained" onPress={handleSubmit(entrar)}>
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
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  textEsqueceuSenha: {
    alignSelf: 'flex-end',
  },
  textCadastro: {},
  textError: {
    width: 350,
  },
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
