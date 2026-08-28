import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa o serviço de autenticação do Firebase
export const auth = getAuth(app);