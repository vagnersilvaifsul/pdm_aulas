/* eslint-disable react-hooks/immutability */
import * as Notifications from "expo-notifications";
import {
	collection,
	deleteField,
	doc,
	getDocs,
	query,
	where,
	writeBatch,
} from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { db } from "../firebase/firebaseInit";
import { AuthContext } from "./AuthProvider";

export const FcmContext = createContext({});

export const FcmProvider = ({ children }: any) => {
	const { userAuth } = useContext<any>(AuthContext);

	useEffect(() => {
		if (userAuth) {
			cadastrarTokenDispositivoNoFirestore(userAuth.user.uid);
		}
	}, [userAuth]);

	async function cadastrarTokenDispositivoNoFirestore(uid: string) {
		try {
			const token = await Notifications.getDevicePushTokenAsync();
			//Procura os usuários que já têm este token (o aparelho pode ter sido
			//usado por outra conta antes)
			const q = query(
				collection(db, "usuarios"),
				where("token_fcm", "==", token.data),
			);
			const querySnapshot = await getDocs(q);
			//Se o token já é só deste usuário, não há nada a fazer
			if (querySnapshot.size === 1 && querySnapshot.docs[0].id === uid) {
				return;
			}
			const lote = writeBatch(db);
			//Remove o token das outras contas, para o aparelho não receber
			//notificações duplicadas nem de uma conta que já saiu dele
			querySnapshot.docs
				.filter((usuario) => usuario.id !== uid)
				.forEach((usuario) =>
					lote.update(usuario.ref, { token_fcm: deleteField() }),
				);
			//Grava o token no usuário autenticado
			lote.set(
				doc(db, "usuarios", uid),
				{
					token_fcm: token.data,
				},
				{
					merge: true,
				},
			); //update
			await lote.commit();
		} catch (error: any) {
			console.error(
				"Erro buscar o token do dispositivo no Firestore: " + error.message,
			);
		}
	}
	return <FcmContext.Provider value={{}}>{children}</FcmContext.Provider>;
};
