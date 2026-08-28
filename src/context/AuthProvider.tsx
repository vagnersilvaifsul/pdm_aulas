import { auth } from "@/firebase/firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	useEffect(() => {
		//signIn("teste@email.com", "Teste12");
	}, []);

	async function signIn(email: string, senha: string): Promise<string> {
		try {
			await signInWithEmailAndPassword(auth, email, senha);
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
		<AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
	);
};
