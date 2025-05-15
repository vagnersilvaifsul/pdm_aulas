import { firestore } from "@/firebase/firebaseInit";
import { Empresa } from "@/model/Empresa";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";

export const EmpresaContext = createContext({});

export const EmpresaProvider = ({ children }: any) => {
	const [empresa, setEmpresa] = useState<Empresa[] | null>(null);

	useEffect(() => {
		const q = query(collection(firestore, "empresas"), orderBy("nome"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			console.log(querySnapshot);
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
				console.log(data);
				setEmpresa(data);
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<EmpresaContext.Provider value={{ empresa }}>
			{children}
		</EmpresaContext.Provider>
	);
};
