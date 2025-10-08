import { auth } from "@/firebase/FirebaseInit";
import { Credencial } from "@/model/types";
import * as SecureStore from "expo-secure-store";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import React, { createContext, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	useEffect(() => {
		sair();
	}, []);

	async function armazenaCredencialnaCache(
		credencial: Credencial
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

	async function singIn(credencial: Credencial): Promise<string> {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				credencial.email,
				credencial.senha
			);
			console.log(userCredential.user);
			console.log(userCredential.user.email);
			armazenaCredencialnaCache(credencial);
			return "ok";
		} catch (error: any) {
			return launchServerMessageErro(error);
		}
	}

	async function singUp(): Promise<string> {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			"vagnersilva@ifsul.edu.br",
			"Teste12@"
		);
		if (userCredential) {
			await sendEmailVerification(userCredential.user);
		}
		console.log(userCredential.user);
		return "ok";
	}

	async function sair(): Promise<string> {
		try {
			SecureStore.deleteItemAsync("credencial");
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
				return "Erro desconhecido. Contate o administrador.";
		}
	}

	return (
		<AuthContext.Provider
			value={{ singIn, singUp, sair, recuperaCredencialdaCache }}
		>
			{children}
		</AuthContext.Provider>
	);
};
