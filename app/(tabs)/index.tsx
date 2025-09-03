import { MeuBotao } from "@/components/MeuBotao";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
	//Conceito de state
	const [contador, setContador] = useState(0);

	useEffect(() => {
		console.log("Botão renderizado na construção do componente");

		return () => {
			console.log("Botão desmontado");
		};
	}, []);

	// useEffect(() => {
	// 	console.log("Botão renderizado na atualização do componente");
	// });

	useEffect(() => {
		console.log("Botão renderizado na atualização da state contador");
	}, [contador]);

	function incrementar() {
		setContador(contador + 1);
	}

	function decrementar() {
		setContador(contador - 1);
	}

	//retornar um JSX define essa função como componente Rect
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home</Text>
			<Text style={styles.text}>Contador {contador}</Text>
			<MeuBotao texto="Meu Botão" aoClicar={incrementar} />
			<MeuBotao texto="Meu Botão" aoClicar={decrementar} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
	},
});
