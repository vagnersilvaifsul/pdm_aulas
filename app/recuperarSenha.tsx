import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Cadastrar() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Recuperar Senha</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 30,
		fontWeight: "bold",
	},
});
