import { MeuBotao } from "@/components/MeuBotao";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
	//retornar um JSX define essa função como componente Rect
	function incrementar() {
		alert("Clicou incrementar");
	}

	function decrementar() {
		alert("Desceu decrementar");
	}

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home</Text>
			<Text style={styles.text}>Home</Text>
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
