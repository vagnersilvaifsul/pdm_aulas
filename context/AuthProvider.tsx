import { auth } from "@/firebase/FirebaseInit";
import { Credencial } from "@/model/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	async function singIn(credencial: Credencial): Promise<string> {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				credencial.email,
				credencial.senha
			);
			console.log(userCredential.user);
			console.log(userCredential.user.email);
			return "ok";
		} catch (error: any) {
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
		<AuthContext.Provider value={{ singIn }}>{children}</AuthContext.Provider>
	);
};
