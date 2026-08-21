import { StyleSheet, Text, TouchableHighlight } from "react-native";

export function MyBotao({
	texto,
	onClick,
}: {
	texto: string;
	onClick: () => void;
}) {
	console.log("props", { texto, onClick });
	return (
		<TouchableHighlight style={styles.botao} onPress={onClick}>
			<Text>{texto}</Text>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
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
