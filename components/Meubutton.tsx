import { StyleSheet, Text, TouchableHighlight } from "react-native";

export function MeuBotao(props: any) {
	console.log("Meu Botão", props);
	return (
		<TouchableHighlight onPress={props.onClick} underlayColor="lightgray">
			<Text style={styles.text}>{props.texto}</Text>
		</TouchableHighlight>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 50,
		fontWeight: "bold",
	},
});
