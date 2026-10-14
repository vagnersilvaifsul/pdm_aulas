import { db } from "@/firebase/firebaseInit";
import { Empresa } from "@/model/Empresa";
import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export const EmpresaContext = createContext({});

export const EmpresaProvider = ({ children }: any) => {
	const [empresas, setEmpresas] = useState<Empresa[]>([]);
	useEffect(() => {
		//select (ou get)
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
				setEmpresas(data);
			}
		});
		// let empresa: Empresa = {
		// 	nome: "teste2",
		// 	tecnologias: "react, react-native",
		// 	endereco: "Rua Teste2",
		// 	latitude: -31.766453286495448,
		// 	longitude: -52.351914793252945,
		// 	urlFoto:
		// 		"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
		// } as Empresa;
		// save(empresa);

		// let empresa: Empresa = {
		// 	uid: "5WCirUvAD9iGykXFFQQS",
		// 	nome: "teste2",
		// 	tecnologias: "react, react-native",
		// 	endereco: "Rua Teste2",
		// 	latitude: -31.766453286495448,
		// 	longitude: -52.351914793252945,
		// 	urlFoto:
		// 		"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
		// } as Empresa;
		// save(empresa);
		return () => unsubscribe();
	}, []);

	//save (insert ou update)
	async function save(empresa: Empresa): Promise<string> {
		try {
			const uid = empresa.uid;
			delete empresa.uid; //evita que a uid seja salva no banco
			if (uid) {
				await setDoc(doc(db, "empresas", uid), empresa, {
					merge: true,
				}); //update
			} else {
				await addDoc(collection(db, "empresas"), empresa); //insert
			}
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
