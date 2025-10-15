
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './FirebaseConfig';

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

//serviço de autenticação (Authentication)
export const auth = getAuth(app);

//serviço de banco de dados (Firestore)
export const firestore = getFirestore(app);