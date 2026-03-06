import { MeuBotao } from "@/components/Meubutton";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
			<MeuBotao texto="Reset" onClick={() => setCount(0)} />
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
