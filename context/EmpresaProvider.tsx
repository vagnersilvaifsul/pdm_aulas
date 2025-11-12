import { firestore } from "@/firebase/FirebaseInit";
import { Empresa } from "@/model/Empresa";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	setDoc,
} from "firebase/firestore";
import React, { createContext, useEffect } from "react";

export const EmpresaContext = createContext({});

export const EmpresaProvider = ({ children }: any) => {
	const [empresas, setEmpresas] = React.useState<Empresa[]>([
		{
			nome: "teste forçado",
			tecnologias: "react, react-native",
			endereco: "Rua Teste forçado",
			latitude: -31.766453286495448,
			longitude: -52.351914793252945,
			urlFoto:
				"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
		} as Empresa,
	]);

	//Read
	useEffect(() => {
		//Fetch empresas from API or database
		const q = collection(firestore, "empresas");
		const unsubscribe = onSnapshot(q, (doc) => {
			console.log(doc);
			if (!doc.empty) {
				let data: Empresa[] = [];
				doc.forEach((doc) => {
					data.push({
						uid: doc.id,
						nome: doc.data().nome,
						tecnologias: doc.data().tecnologias,
						cep: doc.data().cep,
						endereco: doc.data().endereco,
						latitude: doc.data().latitude,
						longitude: doc.data().longitude,
						urlFoto: doc.data().urlFoto,
					} as Empresa);
				});
				setEmpresas(data);
			}
		});
		// Insert
		// insert({
		// 	nome: "teste 2 insert",
		// 	tecnologias: "react, react-native",
		// 	endereco: "Rua Teste 2 insert",
		// 	latitude: -31.766453286495448,
		// 	longitude: -52.351914793252945,
		// 	urlFoto:
		// 		"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
		// } as Empresa);
		// Update
		// update({
		// 	uid: "Wa8fa9TxiIOvJL5oJEtB",
		// 	nome: "teste 1 update",
		// 	tecnologias: "react, react-native",
		// 	endereco: "Rua Teste 1 update",
		// 	latitude: -31.766453286495448,
		// 	longitude: -52.351914793252945,
		// 	urlFoto:
		// 		"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
		// } as Empresa);
		// Delete
		//remove("Wa8fa9TxiIOvJL5oJEtB");
		return () => unsubscribe();
	}, []);

	//Insert
	async function insert(empresa: Empresa): Promise<string> {
		//Save empresa to API or database
		try {
			await addDoc(collection(firestore, "empresas"), empresa);
			return "ok";
		} catch (error) {
			console.error("Error insert empresa:", error);
			return "Erro, contate o administrador.";
		}
	}

	//Update
	async function update(empresa: Empresa): Promise<string> {
		//Update empresa in API or database
		try {
			if (!empresa.uid) {
				throw new Error("UID is required for update.");
			}
			const uid = empresa.uid;
			delete empresa.uid; //remover uid do objeto para não sobrescrever no Firestore
			await setDoc(doc(firestore, "empresas", uid), empresa, { merge: true });
			return "ok";
		} catch (error) {
			console.error("Error update empresa:", error);
			return "Erro, contate o administrador.";
		}
	}

	//Delete
	async function remove(uid: string) {
		//Delete empresa from API or database
		try {
			await deleteDoc(doc(firestore, "empresas", uid));
			return "ok";
		} catch (error) {
			console.error("Error delete empresa:", error);
			return "Erro, contate o administrador.";
		}
	}

	return (
		<EmpresaContext.Provider value={{ insert, update, remove, empresas }}>
			{children}
		</EmpresaContext.Provider>
	);
};
