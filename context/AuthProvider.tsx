import { auth, firestore } from "@/firebase/firebaseInit";
import { Curso } from "@/model/Curso";
import { Perfil } from "@/model/Perfil";
import { Credencial } from "@/model/types";
import { Usuario } from "@/model/Usuario";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from "@firebase/auth";
import * as SecureStore from "expo-secure-store";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	/*
		Cache criptografado do app
	*/

	async function armazenaCredencialnaCache(
		credencial: Credencial,
	): Promise<void> {
		try {
			await SecureStore.setItem("credencial", JSON.stringify(credencial));
		} catch (error) {
			console.error(
				"Erro em armazenaCredencialnaCache ao armazenar credencial na cache: ",
				error,
			);
		}
	}

	async function recuperaCredencialdaCache(): Promise<Credencial | null> {
		try {
			const credencial = await SecureStore.getItem("credencial");
			if (credencial) {
				return JSON.parse(credencial);
			}
			return null;
		} catch (error) {
			console.error(
				"Erro em recuperaCredencialdaCache ao recuperar credencial da cache: ",
				error,
			);
			return null;
		}
	}

	async function signIn(credencial: Credencial): Promise<string> {
		try {
			const userCredencial = await signInWithEmailAndPassword(
				auth,
				credencial.email,
				credencial.senha,
			);
			armazenaCredencialnaCache(credencial);
			return "ok";
		} catch (error) {
			return launchServerMessageErro(error);
		}
	}

	async function sair(): Promise<string> {
		try {
			await auth.signOut();
			await SecureStore.deleteItemAsync("credencial");
			return "ok";
		} catch (error) {
			console.error("Erro ao sair: ", error);
			return "Erro ao sair. Tente novamente.";
		}
	}

	async function cadastrar(usuario: Usuario): Promise<string> {
		try {
			if (usuario.email && usuario.senha) {
				const userCredencial = await createUserWithEmailAndPassword(
					auth,
					usuario.email,
					usuario.senha,
				);
				if (userCredencial) {
					await sendEmailVerification(userCredencial.user);
					let usuarioFirestore = {
						uid: userCredencial.user.uid,
						email: usuario.email,
						nome: usuario.nome,
						urlFoto: usuario.urlFoto,
						curso: usuario.curso,
						perfil: usuario.perfil,
					};
					await setDoc(
						///usuarios/sbwNx8XfPnRolTdzX8MEweKJ3ai2
						doc(firestore, "usuarios", userCredencial.user.uid),
						usuarioFirestore,
						{ merge: true },
					);
				}
				return "ok";
			} else {
				return "Os campos email e senha são obrigatórios.";
			}
		} catch (error) {
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
		<AuthContext.Provider value={{ signIn, recuperaCredencialdaCache, sair, cadastrar }}>
			{children}
		</AuthContext.Provider>
	);
};
