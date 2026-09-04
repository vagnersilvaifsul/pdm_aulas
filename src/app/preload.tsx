import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Preload() {
	const theme = useTheme();
	const { recuperarCredencialdaCache, signIn } = useContext<any>(AuthContext);

	useEffect(() => {
		entrar();
	}, []);

	async function entrar(): Promise<void> {
		const credencial = await recuperarCredencialdaCache();
		console.log("credencial recuperada do cache: ", credencial);
		if (credencial) {
			const result = await signIn(credencial);
			if (result === "ok") {
				router.replace("/(tabs)/home");
			} else {
				router.replace("/entrar");
			}
		} else {
			router.replace("/entrar");
		}
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<Image
				style={styles.imagem}
				source={require("../../assets/images/logo512.png")}
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
