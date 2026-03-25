import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function Preload() {
	const { signIn } = useContext(AuthContext);

	async function logar() {
		//const credencial = await buscaNaCache();
		const resposta = await signIn({});
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
		<View>
			<Text>Loading...</Text>
		</View>
	);
}
