import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, SafeAreaView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function Preload() {
	const theme = useTheme();
	const { recuperaCredencialdaCache } = useContext<any>(AuthContext);

	useEffect(() => {
		//ao montar o componente tenta logar com as credenciais da cache
		logar();
	}, []);

	async function logar() {
		const credencial = await recuperaCredencialdaCache();
		console.log("credencial cache: ");
		console.log(credencial);

		if (credencial) {
			// await singIn(JSON.parse(credencial));
			console.log("logado com cache");
			router.replace("/(tabs)");
		} else {
			router.replace("/signIn");
		}
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<Image
				style={styles.imagem}
				source={require("../assets/images/logo512.png")}
				accessibilityLabel="logo do app"
			/>
		</SafeAreaView>
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
