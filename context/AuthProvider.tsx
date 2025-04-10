import { auth } from "@/firebase/firebaseInit";
import { Credential } from "@/model/type";
import * as SecureStore from "expo-secure-store";
import {
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
} from "firebase/auth";
import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	const [userAuth, setUserAuth] = useState<UserCredential | null>(null);

	/*
    Cache criptografado do usuário
  */
	async function armazenaCredencialnaCache(
		credencial: Credential
	): Promise<void> {
		try {
			await SecureStore.setItemAsync(
				"credencial",
				JSON.stringify({
					email: credencial.email,
					senha: credencial.senha,
				})
			);
		} catch (e) {
			console.error("AuthProvider, armazenaCredencialnaCache: " + e);
		}
	}

	async function recuperaCredencialdaCache(): Promise<null | string> {
		try {
			const credencial = await SecureStore.getItemAsync("credencial");
			return credencial ? JSON.parse(credencial) : null;
		} catch (e) {
			console.error("AuthProvider, recuperaCredencialdaCache: " + e);
			return null;
		}
	}

	async function signIn(credencial: Credential): Promise<string> {
		try {
			let userCredential = await signInWithEmailAndPassword(
				auth,
				credencial.email,
				credencial.senha
			);
			setUserAuth(userCredential.user);
			armazenaCredencialnaCache(credencial);
			console.log("Atenticou", userCredential.user);
			return "ok";
		} catch (error: any) {
			console.error("Erro ao autenticar", error.code, error.message);
			return launchServerMessageErro(error);
		}
	}

	async function sair(): Promise<string> {
		try {
			await SecureStore.deleteItemAsync("credencial");
			await signOut(auth);
			return "ok";
		} catch (error: any) {
			console.error(error.code, error.message);
			return launchServerMessageErro(error);
		}
	}

	//função utilitária
	function launchServerMessageErro(e: any): string {
		switch (e.code) {
			case "auth/invalid-credential":
				return "Email inexistente ou senha errada.";
			case "auth/user-not-found":
				return "Usuário não cadastrado.";
			case "auth/wrong-password":
				return "Erro na senha.";
			case "auth/invalid-email":
				return "Email inexistente.";
			case "auth/user-disabled":
				return "Usuário desabilitado.";
			case "auth/email-already-in-use":
				return "Email em uso. Tente outro email.";
			default:
				return "Erro desconhecido. Contate o administrador";
		}
	}

	return (
		<AuthContext.Provider
			value={{ signIn, recuperaCredencialdaCache, userAuth, sair }}
		>
			{children}
		</AuthContext.Provider>
	);
};
