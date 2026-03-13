import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Entrar() {
	const { signIn } = useContext<any>(AuthContext);

	async function entrar(email: string, senha: string) {
		const resposta = await signIn(email, senha);
		if (resposta === "ok") {
			router.replace("/(tabs)/home");
		} else {
			alert(resposta);
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Entrar</Text>
			<TouchableHighlight
				onPress={() => {
					// router.replace("/(tabs)/home");
					entrar();
				}}
			>
				<Text style={styles.text}>Vá para outra página</Text>
			</TouchableHighlight>
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
		fontSize: 50,
		fontWeight: "bold",
	},
});
