import { auth } from "@/firebase/firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { createContext } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
	async function signIn() {
		signInWithEmailAndPassword(auth, "teste@email.com", "Teste12@")
			.then((userCredential) => {
				// Signed up
				const user = userCredential.user;
				console.log("Atenticou", user);

				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.error("Erro ao autenticar", errorCode, errorMessage);
				// ..
			});
	}

	return (
		<AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
	);
};
