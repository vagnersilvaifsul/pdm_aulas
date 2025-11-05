import { auth, firestore, storage } from "@/firebase/FirebaseInit";
import { Credencial } from "@/model/types";
import { Usuario } from "@/model/Usuario";
import * as ImageManipulator from "expo-image-manipulator";
import * as SecureStore from "expo-secure-store";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
			if (userCredential.user.emailVerified === false) {
				return "Você precisa verificar seu email para continuar.";
			}
			armazenaCredencialnaCache(credencial);
			return "ok";
		} catch (error: any) {
			return launchServerMessageErro(error);
		}
	}

	async function signUp(usuario: Usuario, urlDevice: string): Promise<string> {
		try {
			if (usuario.email && usuario.senha) {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					usuario.email,
					usuario.senha
				);
				if (userCredential) {
					await sendEmailVerification(userCredential.user);
					if (urlDevice !== "") {
						const urlStorage = await sendImageToStorage(
							urlDevice,
							userCredential.user.uid
						);
						if (!urlStorage) {
							return "Erro ao enviar a foto de perfil. Contate o administrador.";
						}
						usuario.urlFoto = urlStorage;
					}
					//A senha não deve ser persistida no serviço Firetore, ela é gerida pelo serviço Authentication
					const usuarioFirestore = {
						email: usuario.email,
						nome: usuario.nome,
						urlFoto: usuario.urlFoto,
						curso: usuario.curso,
						perfil: usuario.perfil,
					};
					await setDoc(
						doc(firestore, "usuarios", userCredential.user.uid),
						usuarioFirestore,
						{ merge: true }
					);
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

	async function sendImageToStorage(
		urlDevice: string,
		uid: string
	): Promise<string | null> {
		try {
			//1. Redimensiona, compacta a imagem, e a transforma em blob
			//ImageManipulator.ImageManipulator.manipulate será o substituto de ImageManipulator.manipulateAsync
			const imageRedimencionada = await ImageManipulator.manipulateAsync(
				urlDevice,
				[{ resize: { width: 150, height: 150 } }],
				{ compress: 0.8, format: ImageManipulator.SaveFormat.PNG }
			);
			const data = await fetch(imageRedimencionada?.uri);
			const blob = await data.blob();

			//2. e prepara o path onde ela deve ser salva no storage
			const storageReference = ref(storage, `imagens/usuarios/${uid}/foto.png`);

			//3. Envia para o storage
			await uploadBytes(storageReference, blob);

			//4. Retorna a URL da imagem
			const url = await getDownloadURL(
				ref(storage, `imagens/usuarios/${uid}/foto.png`)
			);
			return url;
		} catch (e) {
			console.error(e);
			return null;
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
