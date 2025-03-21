import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SegundaJanela() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.texto}>Segunda Janela</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	texto: {
		fontSize: 40,
		color: "blue",
	},
});
