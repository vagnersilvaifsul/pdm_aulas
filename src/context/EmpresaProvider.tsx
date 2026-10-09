import { db } from "@/firebase/firebaseInit";
import { Empresa } from "@/model/Empresa";
import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const EmpresaContext = createContext({});

export const EmpresaProvider = ({ children }: any) => {
	const [empresas, setEmpresas] = useState<Empresa[]>([]);
	useEffect(() => {
		const q = query(collection(db, "empresas"), orderBy("nome"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			if (querySnapshot) {
				let data: Empresa[] = [];
				querySnapshot.forEach((doc) => {
					data.push({
						uid: doc.id,
						nome: doc.data().nome,
						tecnologias: doc.data().tecnologias,
						cep: doc.data().cep,
						endereco: doc.data().endereco,
						latitude: doc.data().latitude,
						longitude: doc.data().longitude,
						urlFoto: doc.data().urlFoto,
					});
				});
				console.log("empresas: ", data);
				setEmpresas(data);
			}
		});
		return () => unsubscribe();
		// let empresa: Empresa = {
		// 	nome: "teste",
		// 	tecnologias: "react, react-native",
		// 	endereco: "Rua Teste",
		// 	latitude: -31.766453286495448,
		// 	longitude: -52.351914793252945,
		// 	urlFoto:
		// 		"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
		// } as Empresa;
		// save(empresa);
	}, []);

	//save (insert ou update)
	async function save(empresa: Empresa): Promise<string> {
		try {
			await addDoc(collection(db, "empresas"), empresa); //insert
			return "ok";
		} catch (error) {
			console.error("Error em save: ", error);
			return "Erro, contate o administrador.";
		}
	}

	return (
		<EmpresaContext.Provider value={{ save, empresas }}>
			{children}
		</EmpresaContext.Provider>
	);
};
