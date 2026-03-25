import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function Preload() {
	const theme = useTheme();
	const { signIn, recuperaCredencialdaCache } = useContext<any>(AuthContext);

	async function logar() {
		const credencial = await recuperaCredencialdaCache();
		const resposta = await signIn(credencial);
		if (resposta === "ok") {
			router.replace("/(tabs)/home");
		} else {
			router.replace("/entrar");
		}
	}

	useEffect(() => {
		logar();
	}, []);

	return (
		<View
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<Image
				style={styles.imagem}
				source={require("../assets/images/logo512.png")}
				accessibilityLabel="logo do app"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	imagem: {
		width: 250,
		height: 250,
	},
});
