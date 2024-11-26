import auth from '@react-native-firebase/auth';
import React, {createContext} from 'react';
import {Credencial} from '../model/types';

export const AuthContext = createContext({});

export const AuthProvider = ({children}: any) => {
  async function signIn(credencial: Credencial) {
    console.log('Entrar', credencial);
    try {
      await auth().signInWithEmailAndPassword(credencial.email, credencial.senha);
      return 'ok';
    } catch (error) {
      console.error(error);
      return launchServerMessageErro(error);
    }
  }

  //função utilitária
  function launchServerMessageErro(e: any): string {
    switch (e.code) {
      case 'auth/invalid-credential':
        return 'Email inexistente ou senha errada.';
      case 'auth/user-not-found':
        return 'Usuário não cadastrado.';
      case 'auth/wrong-password':
        return 'Erro na senha.';
      case 'auth/invalid-email':
        return 'Email inexistente.';
      case 'auth/user-disabled':
        return 'Usuário desabilitado.';
      case 'auth/email-already-in-use':
        return 'Email em uso. Tente outro email.';
      default:
        return 'Erro desconhecido. Contate o administrador';
    }
  }

  return <AuthContext.Provider value={{signIn}}>{children}</AuthContext.Provider>;
};
