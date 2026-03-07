import { router } from "expo-router";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Entrar() {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Entrar</Text>
			<TouchableHighlight
				onPress={() => {
					router.replace("/(tabs)/home");
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
