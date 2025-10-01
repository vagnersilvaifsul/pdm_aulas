import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Menu() {
	const theme = useTheme();
	return (
		<View
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<Text style={styles.texto}>Menu</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	texto: {
		fontSize: 60,
		fontWeight: "bold",
	},
});
