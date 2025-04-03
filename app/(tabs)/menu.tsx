import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Menu() {
	return (
		<SafeAreaView style={styles.container}>
			<Text>Menu</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
