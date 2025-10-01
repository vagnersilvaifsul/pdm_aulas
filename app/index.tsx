import { AuthContext } from "@/context/AuthProvider";
import { Credencial } from "@/model/types";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
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
	const { singIn } = useContext<any>(AuthContext);
	const [credencial, setCredencial] = useState<Credencial>({
		email: "",
		senha: "",
	});
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
		console.log(credencial);
	});

	async function entrar() {
		const result = await singIn(credencial);
		if (result === "ok") {
			console.log("Logou?", result);
			// Navegar para a tela principal
			router.replace("/(tabs)");
		} else {
			console.error("Erro ao logar:", result);
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
					<TextInput
						style={styles.textinput}
						label="Email"
						placeholder="Digite seu email"
						mode="outlined"
						autoCapitalize="none"
						returnKeyType="next"
						keyboardType="email-address"
						onChangeText={(t) => setCredencial({ ...credencial, email: t })}
						value={credencial.email}
						right={<TextInput.Icon icon="email" color={"white"} />}
					/>
					<TextInput
						style={styles.textinput}
						label="Senha"
						placeholder="Digite sua senha"
						mode="outlined"
						autoCapitalize="none"
						returnKeyType="go"
						secureTextEntry={true}
						onChangeText={(t) => setCredencial({ ...credencial, senha: t })}
						value={credencial.senha}
						right={<TextInput.Icon icon="eye" color={"white"} />}
					/>
					<Button style={styles.button} mode="contained" onPress={entrar}>
						{"Entrar"}
					</Button>
				</>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	texto: {
		fontSize: 60,
		fontWeight: "bold",
		color: "#fff",
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
	},
});
