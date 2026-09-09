import { auth, db } from "@/firebase/firebaseInit";
import { Curso } from "@/model/Curso";
import { Perfil } from "@/model/Perfil";
import { Credencial } from "@/model/types";
import { Usuario } from "@/model/Usuario";
import * as SecureStore from "expo-secure-store";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createContext, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	useEffect(() => {
		//signIn("teste@email.com", "Teste123");
		signUp({
			email: "vagnersilva@ifsul.edu.br",
			senha: "Teste12@",
			nome: "Vagner Silva",
			urlFoto:
				"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
			curso: Curso.CSTSI,
			perfil: Perfil.Aluno,
			uid: "",
		});
	}, []);

	async function recuperarCredencialdaCache(): Promise<Credencial | null> {
		const credencialString = await SecureStore.getItemAsync("credencial");
		if (credencialString) {
			return JSON.parse(credencialString);
		}
		return null;
	}

	async function signUp(usuario: Usuario): Promise<string> {
		try {
			if (usuario.email && usuario.senha) {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					usuario.email,
					usuario.senha,
				);
				if (userCredential) {
					await sendEmailVerification(userCredential.user);
				}
				const usuarioFirebase = {
					email: usuario.email,
					nome: usuario.nome,
					urlFoto: usuario.urlFoto,
					curso: usuario.curso,
					perfil: usuario.perfil,
				};
				await setDoc(
					doc(db, "usuarios", userCredential.user.uid),
					usuarioFirebase,
				);
			}
			return "ok";
		} catch (e: any) {
			return launchServerMessageErro(e);
		}
	}

	async function signIn(credencial: Credencial): Promise<string> {
		try {
			const userAuth = await signInWithEmailAndPassword(
				auth,
				credencial.email,
				credencial.senha,
			);
			if (!userAuth.user.emailVerified) {
				return "Email não verificado. Verifique sua caixa de entrada no serviço de email.";
			}
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
