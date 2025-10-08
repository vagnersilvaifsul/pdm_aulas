import { auth } from "@/firebase/FirebaseInit";
import { Credencial } from "@/model/types";
import { Usuario } from "@/model/Usuario";
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

	async function signUp(usuario: Usuario): Promise<string> {
		try {
			console.log("Iniciando cadastro...");
			console.log(usuario);
			if (usuario.email && usuario.senha) {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					usuario.email,
					usuario.senha
				);
				if (userCredential) {
					await sendEmailVerification(userCredential.user);
					//A senha não deve ser persistida no serviço Firetore, ela é gerida pelo serviço Authentication
					const usuarioFirestore = {
						email: usuario.email,
						nome: usuario.nome,
						urlFoto: usuario.urlFoto,
						curso: usuario.curso,
						perfil: usuario.perfil,
					};
					// await setDoc(
					// 	doc(firestore, "usuarios", userCredential.user.uid),
					// 	usuarioFirestore,
					// 	{ merge: true }
					// );
				}
			} else {
				return "Confira se você digitou o email e a senha.";
			}
			return "ok";
		} catch (e: any) {
			console.error(e.code, e.message);
			return launchServerMessageErro(e);
		}
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
			value={{ singIn, signUp, sair, recuperaCredencialdaCache }}
		>
			{children}
		</AuthContext.Provider>
	);
};
