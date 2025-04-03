import { AuthContext } from "@/context/AuthProvider";
import { Credential } from "@/model/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
	Button,
	Dialog,
	Divider,
	Text,
	TextInput,
	useTheme,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

const requiredMessage = "Campo obrigatório";

/*
  /^
  (?=.*\d)              // deve conter ao menos um dígito
  (?=.*[a-z])           // deve conter ao menos uma letra minúscula
  (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
  (?=.*[$*&@#])         // deve conter ao menos um caractere especial
  [0-9a-zA-Z$*&@#]{8,}  // deve conter ao menos 8 dos caracteres mencionados
$/
*/
const schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.required(requiredMessage)
			.matches(/\S+@\S+\.\S+/, "Email inválido"),
		senha: yup
			.string()
			.required(requiredMessage)
			.matches(
				/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
				"A senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um númeral, um caractere especial e um total de 8 caracteres"
			),
	})
	.required();

export default function SignIn() {
	const theme = useTheme();
	const { signIn } = useContext<any>(AuthContext);
	const [exibirSenha, setExibirSenha] = useState(true);
	const [logando, setLogando] = useState(false);
	const [dialogVisivel, setDialogVisivel] = useState(false);
	const [mensagemDialog, setMensagemDialog] = useState("");
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		defaultValues: {
			email: "",
			senha: "",
		},
		mode: "onSubmit",
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		console.log("Renderizou");
	});

	async function entrar(credencial: Credential) {
		const response = await signIn({
			email: credencial.email,
			senha: credencial.senha,
		});
		if (response === "ok") {
			setLogando(false);
			router.replace("/(tabs)/home");
		} else {
			setMensagemDialog(response);
			setDialogVisivel(true);
			setLogando(false);
		}
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<ScrollView>
				<>
					<Image
						style={styles.image}
						source={require("../assets/images/logo512.png")}
					/>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.textinput}
								label="Email"
								placeholder="Digite seu email"
								mode="outlined"
								autoCapitalize="none"
								returnKeyType="next"
								onBlur={onBlur}
								onChangeText={onChange}
								keyboardType="email-address"
								right={<TextInput.Icon icon="email" />}
							/>
						)}
						name="email"
					/>
					{errors.email && (
						<Text style={{ ...styles.textError, color: theme.colors.error }}>
							{errors.email?.message?.toString()}
						</Text>
					)}
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.textinput}
								label="Senha"
								placeholder="Digite sua senha"
								mode="outlined"
								autoCapitalize="none"
								returnKeyType="go"
								secureTextEntry={exibirSenha}
								onBlur={onBlur}
								onChangeText={onChange}
								right={
									<TextInput.Icon
										icon="eye"
										color={
											exibirSenha
												? theme.colors.onBackground
												: theme.colors.error
										}
										onPress={() => setExibirSenha((previus) => !previus)}
									/>
								}
							/>
						)}
						name="senha"
					/>
					{errors.senha && (
						<Text style={{ ...styles.textError, color: theme.colors.error }}>
							{errors.senha?.message?.toString()}
						</Text>
					)}
					<Text
						style={{
							...styles.textEsqueceuSenha,
							color: theme.colors.tertiary,
						}}
						variant="labelMedium"
						onPress={() => alert("Ir para tela Recuperar senha")}
					>
						Esqueceu sua senha?
					</Text>
					<Button
						style={styles.button}
						mode="contained"
						onPress={handleSubmit(entrar)}
					>
						{!logando ? "Entrar" : "Entrando"}
					</Button>
					<Divider />
					<View style={styles.divCadastro}>
						<Text variant="labelMedium">Não tem uma conta?</Text>
						<Text
							style={{ ...styles.textCadastro, color: theme.colors.tertiary }}
							variant="labelMedium"
							onPress={() => alert("Ir para tela Cadastro")}
						>
							{" "}
							Cadastre-se.
						</Text>
					</View>
				</>
			</ScrollView>
			<Dialog visible={dialogVisivel} onDismiss={() => setDialogVisivel(false)}>
				<Dialog.Icon icon="alert-circle-outline" size={60} />
				<Dialog.Title style={styles.textDialog}>Erro</Dialog.Title>
				<Dialog.Content>
					<Text style={styles.textDialog} variant="bodyLarge">
						{mensagemDialog}
					</Text>
				</Dialog.Content>
			</Dialog>
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
	textDialog: {
		textAlign: "center",
	},
	divCadastro: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "center",
	},
	textCadastro: {},
	textEsqueceuSenha: {
		alignSelf: "flex-end",
		marginTop: 20,
	},
	textError: {
		width: 350,
	},
});
