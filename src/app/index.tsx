import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export function MyBotao(props: { texto: string }) {
	return (
		<TouchableHighlight
			style={styles.botao}
			onPress={() => alert("Botão pressionado!")}
		>
			<Text>{props.texto}</Text>
		</TouchableHighlight>
	);
}

export default function Index() {
	//state - é uma variável que pode ser alterada, e quando ela é alterada, o componente é re-renderizado
	const [cont, setCont] = useState<number>(0);
	return (
		<View style={styles.container}>
			<Text style={styles.texto}>Contador= {cont}</Text>
			<MyBotao texto="Incrementar" />
			<MyBotao texto="Decrementar" />
			<MyBotao texto="Resetar" />
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
