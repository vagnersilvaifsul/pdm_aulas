import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Dialog, Text, TextInput } from "react-native-paper";
export default function Entrar() {
	const { signIn } = useContext<any>(AuthContext);
	const [email, setEmail] = useState<string>("");
	const [senha, setSenha] = useState<string>("");
	const [dialogVisivel, setDialogVisivel] = useState(false);
	const [mensagemDialog, setMensagemDialog] = useState("");

	async function handleSignIn(): Promise<void> {
		const result = await signIn(email, senha);
		if (result === "ok") {
			router.replace("/(tabs)/home");
		} else {
			setMensagemDialog(result);
			setDialogVisivel(true);
		}
	}
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textinput}
				label="Email"
				placeholder="Digite seu email"
				mode="outlined"
				autoCapitalize="none"
				returnKeyType="next"
				keyboardType="email-address"
				onChangeText={(text) => {
					setEmail(text);
					console.log(text);
				}}
			/>
			<TextInput
				style={styles.textinput}
				label="Senha"
				placeholder="Digite sua senha"
				mode="outlined"
				autoCapitalize="none"
				returnKeyType="go"
				secureTextEntry
				onChangeText={(text) => {
					setSenha(text);
					console.log(text);
				}}
			/>
			<Button style={styles.button} mode="contained" onPress={handleSignIn}>
				Entrar
			</Button>
			<Dialog visible={dialogVisivel} onDismiss={() => setDialogVisivel(false)}>
				<Dialog.Icon icon="alert-circle-outline" size={60} />
				<Dialog.Title style={styles.textDialog}>Erro</Dialog.Title>
				<Dialog.Content>
					<Text style={styles.textDialog} variant="bodyLarge">
						{mensagemDialog}
					</Text>
				</Dialog.Content>
			</Dialog>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
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
	},
	textDialog: {
		textAlign: "center",
	},
});
