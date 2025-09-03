import { SafeAreaView, StyleSheet, Text } from "react-native";

export default function SignIn() {
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
