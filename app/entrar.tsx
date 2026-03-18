import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Entrar() {
	const { signIn } = useContext<any>(AuthContext);
	const theme = useTheme();
	const [email, setEmail] = useState<string>("");
	const [senha, setSenha] = useState<string>("");

	async function entrar(email: string, senha: string) {
		const resposta = await signIn(email, senha);
		if (resposta === "ok") {
			router.replace("/(tabs)/home");
		} else {
			alert(resposta);
		}
	}

	console.log(email);

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<TextInput
				style={styles.textinput}
				label="Email"
				placeholder="Digite seu email"
				mode="outlined"
				autoCapitalize="none"
				returnKeyType="next"
				keyboardType="email-address"
				onChangeText={(t) => setEmail(t)}
				right={<TextInput.Icon icon="email" />}
			/>
			<TextInput
				style={styles.textinput}
				label="Senha"
				placeholder="Digite sua senha"
				mode="outlined"
				autoCapitalize="none"
				returnKeyType="done"
				keyboardType="default"
				secureTextEntry
				onChangeText={(t) => setSenha(t)}
				right={<TextInput.Icon icon="lock" />}
			/>
			<Button
				style={styles.button}
				mode="contained"
				onPress={() => entrar(email, senha)}
			>
				Entrar
			</Button>
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
	textinput: {
		width: "80%",
		marginBottom: 20,
	},
	button: {
		marginTop: 50,
		marginBottom: 30,
		width: "80%",
	},
});
