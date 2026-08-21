import { MyBotao } from "@/components/MyBotao";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
	//state - é uma variável que pode ser alterada, e quando ela é alterada, o componente é re-renderizado
	const [cont, setCont] = useState<number>(0);

	function incrementar() {
		setCont(cont + 1);
	}

	function decrementar() {
		setCont(cont - 1);
	}

	function resetar() {
		setCont(0);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.texto}>Contador= {cont}</Text>
			<MyBotao texto="Incrementar" onClick={incrementar} />
			<MyBotao texto="Decrementar" onClick={decrementar} />
			<MyBotao texto="Resetar" onClick={resetar} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	texto: {
		fontSize: 60,
		fontWeight: "bold",
	},
	botao: {
		backgroundColor: "lightgray",
		height: 50,
		width: "80%",
		borderRadius: 10,
		padding: 10,
		marginTop: 20,
	},
});
