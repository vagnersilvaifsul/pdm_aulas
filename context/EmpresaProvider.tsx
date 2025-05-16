import { firestore } from "@/firebase/firebaseInit";
import { Empresa } from "@/model/Empresa";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";

export const EmpresaContext = createContext({});

export const EmpresaProvider = ({ children }: any) => {
	const [empresa, setEmpresa] = useState<Empresa[] | null>(null);

	useEffect(() => {
		const q = query(collection(firestore, "empresas"), orderBy("nome"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			if (querySnapshot) {
				let data: Empresa[] = [];
				querySnapshot.forEach((doc) => {
					data.push({
						uid: doc.id,
						nome: doc.data().nome,
						tecnologias: doc.data().tecnologias,
						endereco: doc.data().endereco,
						latitude: doc.data().latitude,
						longitude: doc.data().longitude,
						urlFoto: doc.data().urlFoto,
					});
				});
				setEmpresa(data);
			}
		});

		save(
			{
				uid: "F9ybdPczEzzWw52cKs5f",
				nome: "Teste Update",
				tecnologias: "Expo, React Native",
				endereco: "Rua Teste Update, 1",
				latitude: -31.766453286495448,
				longitude: -52.351914793252945,
				urlFoto: "",
			},
			""
		);

		//update
		save(
			{
				uid: "F9ybdPczEzzWw52cKs5f",
				nome: "Teste Update",
				tecnologias: "Expo, React Native",
				endereco: "Rua Teste Update, 1",
				latitude: -31.766453286495448,
				longitude: -52.351914793252945,
				urlFoto: "",
			},
			""
		);

		//insert
		save(
			{
				uid: null,
				nome: "Teste Insert",
				tecnologias: "Expo, React Native",
				endereco: "Rua Teste Insert, 1",
				latitude: -31.766453286495448,
				longitude: -52.351914793252945,
				urlFoto: "",
			},
			""
		);

		//delete
		del("lF4jwoyj76UOVjBEFfYf");

		return () => {
			unsubscribe();
		};
	}, []);

	async function save(empresa: Empresa, urlDevice: string) {
		try {
			if (empresa.uid) {
				await setDoc(doc(firestore, "empresas", empresa.uid), empresa, {
					merge: true,
				}); //update
			} else {
				await addDoc(collection(firestore, "empresas"), empresa); //insert
			}
			return "ok";
		} catch (error) {
			console.error("Error em save: ", error);
			return "Erro, contate o administrador.";
		}
	}

	async function del(uid: string): Promise<string> {
		try {
			await deleteDoc(doc(firestore, "empresas", uid));
			return "ok";
		} catch (error) {
			console.error("Error em  del: ", error);
			return "Erro, contate o administrador.";
		}
	}

	return (
		<EmpresaContext.Provider value={{ empresa }}>
			{children}
		</EmpresaContext.Provider>
	);
};
