import { auth } from "@/firebase/firebaseInit";
import { Credential } from "@/model/type";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	async function signIn(credencial: Credential): Promise<string> {
		try {
			let userCredential = await signInWithEmailAndPassword(
				auth,
				credencial.email,
				credencial.senha
			);
			// Signed up
			const user = userCredential.user;
			console.log("Atenticou", user);
			return "ok";
		} catch (error: any) {
			console.error("Erro ao autenticar", error.code, error.message);
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
		<AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
	);
};
