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
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
			return "erro";
		}
	}

	return (
		<AuthContext.Provider value={{ singIn }}>{children}</AuthContext.Provider>
	);
};
