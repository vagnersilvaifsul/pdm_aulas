import { AuthContext } from "@/context/AuthProvider";
import { Credencial } from "@/model/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
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
				"A senha deve conter ao menos uma letra maiúscula, uma letra minúscula, um númeral, um caractere especial e um total de 8 caracteres",
			),
	})
	.required();

export default function Entrar() {
	const { signIn } = useContext<any>(AuthContext);
	const theme = useTheme();
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
	const [exibirSenha, setExibirSenha] = useState(true);

	async function entrar(data: Credencial) {
		console.log(data);

		const resposta = await signIn(data);
		if (resposta === "ok") {
			router.replace("/(tabs)/home");
		} else {
			alert(resposta);
		}
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
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
				rules={{
					required: true,
				}}
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
						value={value}
						right={
							<TextInput.Icon
								icon="eye"
								color={
									exibirSenha ? theme.colors.onBackground : theme.colors.error
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

			<Button
				style={styles.button}
				mode="contained"
				onPress={handleSubmit(entrar)}
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
	textinput: {
		width: "80%",
		height: 50,
		marginTop: 20,
		backgroundColor: "transparent",
	},
	textError: {
		width: "80%",
	},
	button: {
		marginTop: 50,
		marginBottom: 30,
		width: "80%",
	},
});
