import { firestore } from "@/firebase/firebaseInit";
import * as Notifications from "expo-notifications";
import {
	collection,
	doc,
	getDocs,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import React, { createContext, useContext, useEffect } from "react";
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
			//Primeiro verifica se o token já existe no Firestore
			// console.log("Token do dispositivo: ", token.data);
			// console.log("UID do usuário autenticado: ", uid);
			const q = query(
				collection(firestore, "usuarios"),
				where("token", "==", token.data)
			);
			const querySnapshot = await getDocs(q);
			//Se não existir, insere o token
			if (querySnapshot.empty) {
				await setDoc(
					doc(firestore, "usuarios", uid),
					{
						token_fcm: token.data,
					},
					{
						merge: true,
					}
				); //update
			}
		} catch (error: any) {
			console.error(
				"Erro buscar o token do dispositivo no Firestore: " + error.message
			);
		}
	}
	return <FcmContext.Provider value={{}}>{children}</FcmContext.Provider>;
};
