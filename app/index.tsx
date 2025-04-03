import { AuthContext } from "@/context/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
	const theme = useTheme();
	const { signIn } = useContext<any>(AuthContext);
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const [exibirSenha, setExibirSenha] = useState(true);

	useEffect(() => {
		console.log(email);
	});

	async function entrar() {
		const response = await signIn({
			email: email,
			senha: senha,
		});
		console.log(response);
		alert(response);
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<Image
				style={styles.image}
				source={require("../assets/images/logo512.png")}
			/>
			<TextInput
				style={styles.textinput}
				label="Email"
				placeholder="Digite seu email"
				mode="outlined"
				autoCapitalize="none"
				returnKeyType="next"
				keyboardType="email-address"
				onChangeText={(text) => setEmail(text)}
				right={<TextInput.Icon icon="email" />}
			/>
			<TextInput
				style={styles.textinput}
				label="Senha"
				placeholder="Digite sua senha"
				mode="outlined"
				autoCapitalize="none"
				returnKeyType="go"
				secureTextEntry={exibirSenha}
				onChangeText={(text) => setSenha(text)}
				right={
					<TextInput.Icon
						icon="eye"
						color={exibirSenha ? theme.colors.onBackground : theme.colors.error}
						onPress={() => setExibirSenha((previus) => !previus)}
					/>
				}
			/>
			<Button style={styles.button} mode="contained" onPress={entrar}>
				Entrar
			</Button>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	image: {
		width: 200,
		height: 200,
		alignSelf: "center",
		borderRadius: 200 / 2,
		marginTop: 100,
		marginBottom: 40,
	},
	textinput: {
		width: 350,
		height: 50,
		marginTop: 20,
		backgroundColor: "transparent",
	},
	button: {
		marginTop: 50,
		marginBottom: 30,
		width: 350,
	},
});
