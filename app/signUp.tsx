import { AuthContext } from "@/context/AuthProvider";
import { Curso } from "@/model/Curso";
import { Perfil } from "@/model/Perfil";
import { Usuario } from "@/model/Usuario";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Dialog, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

const requiredMessage = "Campo obrigatório";

const schema = yup
	.object()
	.shape({
		nome: yup
			.string()
			.required(requiredMessage)
			.min(2, "O nome deve ter ao menos 2 caracteres"),
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
		confirmar_senha: yup
			.string()
			.required(requiredMessage)
			.equals([yup.ref("senha")], "As senhas não conferem"),
	})
	.required();

export default function SignUp() {
	const theme = useTheme();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		defaultValues: {
			nome: "",
			email: "",
			senha: "",
			confirmar_senha: "",
		},
		mode: "onSubmit",
		resolver: yupResolver(schema),
	});
	const { signUp } = useContext<any>(AuthContext);
	const [exibirSenha, setExibirSenha] = useState(true);
	const [requisitando, setRequisitando] = useState(false);
	const [dialogVisivel, setDialogVisivel] = useState(false);
	const [mensagem, setMensagem] = useState({ tipo: "", mensagem: "" });
	const [urlDevice, setUrlDevice] = useState<string | undefined>("");

	async function cadastrar(data: Usuario) {
		setRequisitando(true);
		data.curso = Curso.CSTSI;
		data.perfil = Perfil.Aluno;
		data.urlFoto = "path/to/image.png";
		const msg = await signUp(data);
		if (msg === "ok") {
			setMensagem({
				tipo: "ok",
				mensagem: `Show! Você foi cadastrado com sucesso. Verifique seu email para validar sua conta.\n${data.email}`,
			});
			setDialogVisivel(true);
			setRequisitando(false);
		} else {
			setMensagem({ tipo: "erro", mensagem: msg });
			setDialogVisivel(true);
			setRequisitando(false);
		}
	}

	async function buscaNaGaleria() {
		alert("Em desenvolvimento");
	}

	async function tiraFoto() {
		alert("Em desenvolvimento");
	}

	return (
		<SafeAreaView
			style={{
				...styles.container,
				backgroundColor: theme.colors.background,
			}}
		>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
			>
				<>
					<Image
						style={styles.image}
						source={
							urlDevice !== ""
								? { uri: urlDevice }
								: require("../assets/images/person.png")
						}
					/>
					<View style={styles.divButtonsImage}>
						<Button
							style={styles.buttonImage}
							mode="outlined"
							icon="image"
							onPress={buscaNaGaleria}
						>
							Galeria
						</Button>
						<Button
							style={styles.buttonImage}
							mode="outlined"
							icon="camera"
							onPress={tiraFoto}
						>
							Foto
						</Button>
					</View>

					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.textinput}
								label="Nome"
								placeholder="Digite seu nome completo"
								mode="outlined"
								autoCapitalize="words"
								returnKeyType="next"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								right={<TextInput.Icon icon="smart-card" />}
							/>
						)}
						name="nome"
					/>
					{errors.email && (
						<Text style={{ ...styles.textError, color: theme.colors.error }}>
							{errors.nome?.message?.toString()}
						</Text>
					)}

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
								keyboardType="email-address"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
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
								returnKeyType="next"
								secureTextEntry={exibirSenha}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								right={
									<TextInput.Icon
										icon="eye"
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
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.textinput}
								label="Confirmar senha"
								placeholder="Confirme sua senha"
								mode="outlined"
								autoCapitalize="none"
								returnKeyType="go"
								secureTextEntry={exibirSenha}
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								right={
									<TextInput.Icon
										icon="eye"
										onPress={() => setExibirSenha((previus) => !previus)}
									/>
								}
							/>
						)}
						name="confirmar_senha"
					/>
					{errors.confirmar_senha && (
						<Text style={{ ...styles.textError, color: theme.colors.error }}>
							{errors.confirmar_senha?.message?.toString()}
						</Text>
					)}
					<Button
						style={styles.button}
						mode="contained"
						onPress={handleSubmit(cadastrar)}
						loading={requisitando}
						disabled={requisitando}
					>
						{!requisitando ? "Cadastrar" : "Cadastrando"}
					</Button>
				</>
			</ScrollView>
			<Dialog
				visible={dialogVisivel}
				onDismiss={() => {
					setDialogVisivel(false);
					if (mensagem.tipo === "ok") {
						router.back();
					}
				}}
			>
				<Dialog.Icon
					icon={
						mensagem.tipo === "ok"
							? "checkbox-marked-circle-outline"
							: "alert-circle-outline"
					}
					size={60}
				/>
				<Dialog.Title style={styles.textDialog}>
					{mensagem.tipo === "ok" ? "Informação" : "Erro"}
				</Dialog.Title>
				<Dialog.Content>
					<Text style={styles.textDialog} variant="bodyLarge">
						{mensagem.mensagem}
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
		marginTop: 50,
	},
	textinput: {
		width: 350,
		height: 50,
		marginTop: 20,
		backgroundColor: "transparent",
	},
	textEsqueceuSenha: {
		alignSelf: "flex-end",
		marginTop: 20,
	},
	textCadastro: {},
	textError: {
		width: 350,
	},
	button: {
		marginTop: 50,
		marginBottom: 30,
	},
	divButtonsImage: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 15,
		marginBottom: 20,
	},
	buttonImage: {
		width: 180,
	},
	textDialog: {
		textAlign: "center",
	},
});
