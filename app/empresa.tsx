import { EmpresaContext } from "@/context/EmpresaProvider";
import { Empresa } from "@/model/Empresa";
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { Button, Dialog, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import * as yup from "yup";

const requiredMessage = "Campo obrigatório";
const schema = yup.object().shape({
	nome: yup
		.string()
		.required(requiredMessage)
		.min(2, "O nome deve ter ao menos 2 caracteres"),
	tecnologias: yup
		.string()
		.required(requiredMessage)
		.min(2, "A tecnologia deve ter ao menos 2 caracteres"),
});

export default function EmpresaDetalhe() {
	const theme = useTheme();
	const { empresa } = useLocalSearchParams();
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<any>({
		defaultValues: {
			nome: JSON.parse(empresa.toString())?.nome,
			tecnologias: JSON.parse(empresa.toString())?.tecnologias,
			endereco: JSON.parse(empresa.toString())?.endereco,
		},
		mode: "onSubmit",
		resolver: yupResolver(schema),
	});
	const [requisitando, setRequisitando] = useState(false);
	const [urlDevice, setUrlDevice] = useState<string | undefined>("");
	const [atualizando, setAtualizando] = useState(false);
	const [mensagem, setMensagem] = useState({ tipo: "", mensagem: "" });
	const [dialogErroVisivel, setDialogErroVisivel] = useState(false);
	const [dialogExcluirVisivel, setDialogExcluirVisivel] = useState(false);
	const { save, del } = useContext<any>(EmpresaContext);
	const [excluindo, setExcluindo] = useState(false);

	console.log(JSON.parse(empresa.toString()));

	async function salvar(value: Empresa) {}

	async function excluirEmpresa() {}

	function avisarDaExclusaoPermanenteDoRegistro() {
		setDialogExcluirVisivel(true);
	}

	function buscaNaGaleria() {
		alert("Em desenvolvimento");
	}

	function tiraFoto() {
		alert("Em desenvolvimento");
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<ScrollView>
				<>
					<Image
						style={styles.image}
						source={
							// urlDevice !== ""
							// 	? { uri: urlDevice }
							// 	: JSON.parse(empresa.toString()) &&
							// 	  JSON.parse(empresa.toString())?.urlFoto !== ""
							// 	? { uri: JSON.parse(empresa.toString())?.urlFoto }
							// 	:
							require("../assets/images/logo512.png")
						}
					/>
					<View style={styles.divButtonsImage}>
						<Button
							style={styles.buttonImage}
							mode="outlined"
							icon="image"
							onPress={() => buscaNaGaleria()}
						>
							Galeria
						</Button>
						<Button
							style={styles.buttonImage}
							mode="outlined"
							icon="camera"
							onPress={() => tiraFoto()}
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
								placeholder="Digite o nome da empresa"
								mode="outlined"
								autoCapitalize="words"
								returnKeyType="next"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								right={<TextInput.Icon icon="office-building" />}
							/>
						)}
						name="nome"
					/>
					{errors.nome && (
						<Text style={{ ...styles.textError, color: theme.colors.error }}>
							{errors.nome?.message?.toString()}
						</Text>
					)}
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.textinput}
								label="Teconologias"
								placeholder="react, react native, expo"
								mode="outlined"
								autoCapitalize="words"
								returnKeyType="next"
								keyboardType="default"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								right={<TextInput.Icon icon="rocket-launch" />}
							/>
						)}
						name="tecnologias"
					/>
					{errors.tecnologias && (
						<Text style={{ ...styles.textError, color: theme.colors.error }}>
							{errors.tecnologias?.message?.toString()}
						</Text>
					)}
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								style={styles.textinput}
								label="Endereço"
								placeholder="Digite o endereço"
								mode="outlined"
								autoCapitalize="words"
								returnKeyType="next"
								onBlur={onBlur}
								onChangeText={onChange}
								value={value}
								right={<TextInput.Icon icon="map" />}
							/>
						)}
						name="endereco"
					/>
					{errors.nome && (
						<Text style={{ ...styles.textError, color: theme.colors.error }}>
							{errors.nome?.message?.toString()}
						</Text>
					)}
					<Button
						style={styles.button}
						mode="contained"
						onPress={handleSubmit(salvar)}
						loading={requisitando}
						disabled={requisitando}
					>
						{!atualizando ? "Salvar" : "Salvando"}
					</Button>
					{JSON.parse(empresa.toString())?.uid && (
						<Button
							style={styles.buttonOthers}
							mode="outlined"
							onPress={handleSubmit(avisarDaExclusaoPermanenteDoRegistro)}
							loading={requisitando}
							disabled={requisitando}
						>
							{!excluindo ? "Excluir" : "Excluindo"}
						</Button>
					)}
				</>
			</ScrollView>
			<Dialog
				visible={dialogExcluirVisivel}
				onDismiss={() => {
					setDialogErroVisivel(false);
					router.back();
				}}
			>
				<Dialog.Icon icon={"alert-circle-outline"} size={60} />
				<Dialog.Title style={styles.textDialog}>{"Ops!"}</Dialog.Title>
				<Dialog.Content>
					<Text style={styles.textDialog} variant="bodyLarge">
						{
							"Você tem certeza que deseja excluir esse registro?\nEsta operação será irreversível."
						}
					</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={() => setDialogExcluirVisivel(false)}>
						Cancelar
					</Button>
					<Button onPress={excluirEmpresa}>Excluir</Button>
				</Dialog.Actions>
			</Dialog>
			<Dialog
				visible={dialogErroVisivel}
				onDismiss={() => {
					setDialogErroVisivel(false);
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
		padding: 20,
	},
	image: {
		width: 180,
		height: 180,
		alignSelf: "center",
		borderRadius: 180 / 2,
		marginTop: 50,
	},
	textinput: {
		width: 350,
		height: 50,
		marginTop: 20,
		backgroundColor: "transparent",
	},
	textError: {
		width: 350,
	},
	button: {
		marginTop: 40,
		width: 350,
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
	buttonOthers: {
		marginTop: 20,
		marginBottom: 30,
		width: 350,
	},
});
