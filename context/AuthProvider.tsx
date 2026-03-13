import { auth } from "@/firebase/firebaseInit";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	const [userFirebase, setUserFirebase] = useState<any>(null);

	async function signIn(email: string, senha: string): Promise<string> {
		try {
			const userCredencial = await signInWithEmailAndPassword(
				auth,
				email,
				senha,
			);
			setUserFirebase(userCredencial.user);
			return "ok";
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
		<AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
	);
};
