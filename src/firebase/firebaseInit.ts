import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebaseConfig";


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Inicializa o serviço de autenticação do Firebase
export const auth = getAuth(app);

//Inicializa o serviço de banco de dados do Firestore
export const db = getFirestore(app);