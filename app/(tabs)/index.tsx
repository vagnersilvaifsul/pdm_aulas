import { useState } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";

export function MeuBotao(props: any) {
	console.log("Meu Botão", props);
	return (
		<TouchableHighlight onPress={props.onClick} underlayColor="lightgray">
			<Text style={styles.text}>{props.texto}</Text>
		</TouchableHighlight>
	);
}

/*
 Uma função só é considerada um componente React se retornar um JSX.
 */
export default function HomeScreen() {
	const [count, setCount] = useState(0);

	console.log("Home Screen");

	/*
	 Um componente React deve retornar um JSX.
	*/
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Home Screen {count}</Text>
			<MeuBotao texto="Increment" onClick={() => setCount(count + 1)} />
			<MeuBotao texto="Decrement" onClick={() => setCount(count - 1)} />
		</View>
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
