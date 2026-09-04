import { auth } from "@/firebase/firebaseInit";
import { Credencial } from "@/model/types";
import * as SecureStore from "expo-secure-store";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	useEffect(() => {
		//signIn("teste@email.com", "Teste123");
	}, []);

	async function recuperarCredencialdaCache(): Promise<Credencial | null> {
		const credencialString = await SecureStore.getItemAsync("credencial");
		if (credencialString) {
			return JSON.parse(credencialString);
		}
		return null;
	}

	async function signIn(credencial: Credencial): Promise<string> {
		try {
			await signInWithEmailAndPassword(
				auth,
				credencial.email,
				credencial.senha,
			);
			//cachear a Credencial do usuário no localStorage (ou SecureStore)
			await SecureStore.setItemAsync("credencial", JSON.stringify(credencial));
			return "ok";
		} catch (e: any) {
			return launchServerMessageErro(e);
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
		<AuthContext.Provider value={{ signIn, recuperarCredencialdaCache }}>
			{children}
		</AuthContext.Provider>
	);
};
