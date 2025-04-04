import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Preload() {
	const theme = useTheme();
	const { signIn, recuperaCredencialdaCache } = useContext<any>(AuthContext);

	useEffect(() => {
		logar();
	}, []);

	async function logar() {
		const credencialCache = await recuperaCredencialdaCache("credencial");
		if (credencialCache) {
			const response = await signIn({
				email: credencialCache.email,
				senha: credencialCache.senha,
			});
			if (response === "ok") {
				router.replace("/(tabs)/home");
			} else {
				router.replace("/signIn");
			}
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
