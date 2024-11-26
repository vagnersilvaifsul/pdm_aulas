import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Dialog, Text, useTheme} from 'react-native-paper';

export default function Preload({navigation}: any) {
  const theme = useTheme();
  const [dialogVisivel, setDialogVisivel] = useState(false);
  const [mensagemErro, setMensagemErro] = useState(
    'Você precisa verificar seu email para continuar',
  );

  useEffect(() => {
    //liga o listener e fica escutando o estado da autenticação no serviço Auth do Firebase
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        console.log('Usuário logado');
        console.log(user);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'AppStack'}],
          }),
        );
      } else {
        setDialogVisivel(true);
      }
    });

    //ao desmontar
    return () => {
      unsubscribe(); //avisa o serviço Auth do Firebase para desligar o listener
    };
  }, []);

  function irParaSignIn() {
    setDialogVisivel(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'SignIn'}],
      }),
    );
  }

  return (
    <View style={{...styles.container, backgroundColor: theme.colors.background}}>
      <Image
        style={styles.imagem}
        source={require('../assets/images/logo512.png')}
        accessibilityLabel="logo do app"
      />
      <Dialog visible={dialogVisivel} onDismiss={irParaSignIn}>
        <Dialog.Icon icon="alert-circle-outline" size={60} />
        <Dialog.Title style={styles.textDialog}>Erro</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.textDialog} variant="bodyLarge">
            {mensagemErro}
          </Text>
        </Dialog.Content>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 250,
    height: 250,
  },
  textDialog: {
    textAlign: 'center',
  },
});
