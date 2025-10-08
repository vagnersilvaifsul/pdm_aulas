import { AuthContext } from "@/context/AuthProvider";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Dialog, Divider, List, Text, useTheme } from "react-native-paper";

export default function Menu() {
	const theme = useTheme();
	const { sair } = useContext<any>(AuthContext);
	const [dialogVisivel, setDialogVisivel] = useState(false);

	async function handleSair() {
		if (await sair()) {
			router.replace("/"); //Veja a branch modulo1_preload para ver como isso está funcionando
		} else {
			setDialogVisivel(true);
		}
	}

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<List.Item
				title="Perfil"
				description="Atualize seu perfil ou exclua sua conta"
				left={() => (
					<List.Icon color={theme.colors.primary} icon="smart-card-outline" />
				)}
				onPress={() => alert("em desenvolvimento")}
			/>
			<Divider />
			<List.Item
				title="Alterar Senha"
				description="Altere sua senha"
				left={() => (
					<List.Icon
						color={theme.colors.primary}
						icon="eye-arrow-right-outline"
					/>
				)}
				onPress={() => alert("em desenvolvimento")}
			/>
			<Divider />
			<List.Item
				title="Sair"
				description="Finaliza sua sessão no aplicativo"
				left={() => <List.Icon color={theme.colors.primary} icon="exit-run" />}
				onPress={handleSair}
			/>
			<Dialog
				visible={dialogVisivel}
				onDismiss={() => {
					setDialogVisivel(false);
				}}
			>
				<Dialog.Icon icon={"alert-circle-outline"} size={60} />
				<Dialog.Title style={styles.textDialog}>'Ops!'</Dialog.Title>
				<Dialog.Content>
					<Text style={styles.textDialog} variant="bodyLarge">
						{`Estamos com problemas para realizar essa operação.\nPor favor,
            contate o administrador.`}
					</Text>
				</Dialog.Content>
			</Dialog>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingLeft: 20,
		paddingTop: 20,
		alignItems: "center",
	},
	textDialog: {
		textAlign: "center",
	},
});
