import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function SignIn() {
	const { singIn } = useContext<any>(AuthContext);

	useEffect(() => {
		entrar();
	}, []);

	async function entrar() {
		const result = await singIn({
			email: "teste@email.com",
			senha: "Teste123",
		});
		console.log("Resultado do login:", result);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.texto}>Sign In</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	texto: {
		fontSize: 60,
		fontWeight: "bold",
		color: "#fff",
	},
});
