import { auth } from "@/firebase/firebaseInit";
import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { createContext, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	async function signIn() {
		const userCredencial = await signInWithEmailAndPassword(
			auth,
			"teste@email.com",
			"Teste123",
		);
		console.log(userCredencial);
	}

	useEffect(() => {
		signIn();
	}, []);

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
