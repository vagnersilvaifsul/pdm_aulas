import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
	const { signIn } = useContext<any>(AuthContext);

	async function entrar() {
		await signIn();
	}

	useEffect(() => {
		entrar();
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.texto}>Home</Text>
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
