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
      return 'deu bug';
    }
  }

  return <AuthContext.Provider value={{signIn}}>{children}</AuthContext.Provider>;
};
