import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./firebaseConfig";

// Autentica no Firebase
export const app = initializeApp(firebaseConfig);
// Inicializa o módulo de autenticação
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
