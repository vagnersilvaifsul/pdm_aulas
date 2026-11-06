import { auth, db, storage } from "@/firebase/firebaseInit";
import { Credencial } from "@/model/types";
import { Usuario } from "@/model/Usuario";
import * as ImageManipulator from "expo-image-manipulator";
import * as SecureStore from "expo-secure-store";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	signOut,
	UserCredential,
} from "firebase/auth";
import { deleteField, doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	const [userAuth, setUserAuth] = useState<UserCredential | null>(null);
	useEffect(() => {
		//signIn("teste@email.com", "Teste123");
		// signUp({
		// 	email: "vagnersilva@ifsul.edu.br",
		// 	senha: "Teste12@",
		// 	nome: "Vagner Silva",
		// 	urlFoto:
		// 		"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
		// 	curso: Curso.CSTSI,
		// 	perfil: Perfil.Aluno,
		// 	uid: "",
		// });
	}, []);

	async function recuperarCredencialdaCache(): Promise<Credencial | null> {
		const credencialString = await SecureStore.getItemAsync("credencial");
		if (credencialString) {
			return JSON.parse(credencialString);
		}
		return null;
	}

	async function signUp(usuario: Usuario, urlDevice: string): Promise<string> {
		try {
			if (usuario.email && usuario.senha) {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					usuario.email,
					usuario.senha,
				);
				if (userCredential) {
					await sendEmailVerification(userCredential.user);
					if (urlDevice !== "") {
						const urlStorage = await sendImageToStorage(
							urlDevice,
							userCredential.user.uid,
						);
						if (!urlStorage) {
							return "Erro ao cadastrar o usuário. Contate o suporte."; //não deixa salvar ou atualizar se não realizar todos os passos para enviar a imagem para o storage
						}
						usuario.urlFoto = urlStorage;
					}
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
			setUserAuth(userAuth);
			//cachear a Credencial do usuário no localStorage (ou SecureStore)
			await SecureStore.setItemAsync("credencial", JSON.stringify(credencial));
			return "ok";
		} catch (e: any) {
			return launchServerMessageErro(e);
		}
	}

	//função utilitária
	async function sendImageToStorage(
		urlDevice: string,
		uid: string,
	): Promise<string | null> {
		try {
			//1. Redimensiona, compacta a imagem, e a transforma em blob
			const context = ImageManipulator.ImageManipulator.manipulate(urlDevice);

			context.resize({ width: 150, height: 150 });

			const imageRef = await context.renderAsync();
			const imageRedimencionada = await imageRef.saveAsync({
				compress: 0.8,
				format: ImageManipulator.SaveFormat.PNG,
			});

			const data = await fetch(imageRedimencionada?.uri);
			const blob = await data.blob();

			//2. e prepara o path onde ela deve ser salva no storage
			const storageReference = ref(storage, `imagens/usuarios/${uid}/foto.png`);

			//3. Envia para o storage
			await uploadBytes(storageReference, blob, { contentType: "image/png" });

			//4. Retorna a URL da imagem
			const url = await getDownloadURL(
				ref(storage, `imagens/usuarios/${uid}/foto.png`),
			);
			return url;
		} catch (e) {
			console.error(e);
			return null;
		}
	}

	async function sair(): Promise<string> {
		try {
			await SecureStore.deleteItemAsync("credencial");
			await apagaTokenDispositivoNoFirestore();
			await signOut(auth);
			setUserAuth(null);
			return "ok";
		} catch (error: any) {
			console.error(error.code, error.message);
			return launchServerMessageErro(error);
		}
	}

	//Remove o token deste aparelho do usuário, para que ele pare de receber
	//notificações depois de sair. Precisa rodar antes do signOut, pois as
	//regras do Firestore só deixam o próprio usuário alterar o seu documento.
	async function apagaTokenDispositivoNoFirestore(): Promise<void> {
		try {
			if (auth.currentUser) {
				await updateDoc(doc(db, "usuarios", auth.currentUser.uid), {
					token_fcm: deleteField(),
				});
			}
		} catch (e) {
			//não impede o logout se não conseguir apagar o token
			console.error("AuthProvider, apagaTokenDispositivoNoFirestore: " + e);
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
		<AuthContext.Provider
			value={{ signIn, recuperarCredencialdaCache, signUp, sair }}
		>
			{children}
		</AuthContext.Provider>
	);
};
