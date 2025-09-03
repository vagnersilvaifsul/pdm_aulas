import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function MeuBotao({
	texto,
	aoClicar,
}: {
	texto: string;
	aoClicar: () => void;
}) {
	return (
		<View>
			<TouchableOpacity style={styles.botao} onPress={aoClicar}>
				<Text style={styles.text}>{texto}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	botao: {
		backgroundColor: "#6200ee",
		borderRadius: 4,
		padding: 12,
		marginVertical: 8,
	},
	text: {
		color: "#fff",
		fontSize: 16,
		textAlign: "center",
	},
});
