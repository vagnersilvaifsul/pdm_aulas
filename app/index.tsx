import { auth } from "@/firebase/FirebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function SignIn() {
	useEffect(() => {
		entrar();
	}, []);

	async function entrar() {
		console.log("Chamou entrar");
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				"teste@email.com",
				"Teste123"
			);
			console.log(userCredential.user);
			console.log(userCredential.user.email);
			//router.replace("/(tabs)");
		} catch (error: any) {
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(errorCode, errorMessage);
		}
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
