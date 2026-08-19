import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export default function Index() {
	//state - é uma variável que pode ser alterada, e quando ela é alterada, o componente é re-renderizado
	const [cont, setCont] = useState<number>(0);
	return (
		<View style={styles.container}>
			<Text style={styles.texto}>Contador= {cont}</Text>
			<TouchableHighlight
				style={styles.botao}
				onPress={() => setCont(cont + 1)}
			>
				<Text>Incrementar</Text>
			</TouchableHighlight>
			<TouchableHighlight
				style={styles.botao}
				onPress={() => setCont(cont - 1)}
			>
				<Text>Decrementar</Text>
			</TouchableHighlight>
			<TouchableHighlight style={styles.botao} onPress={() => setCont(0)}>
				<Text>Resetar</Text>
			</TouchableHighlight>
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
