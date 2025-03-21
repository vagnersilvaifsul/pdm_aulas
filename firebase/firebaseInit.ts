import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

// Autentica no Firebase
export const app = initializeApp(firebaseConfig);
// Inicializa o módulo de autenticação
export const auth = getAuth(app);
