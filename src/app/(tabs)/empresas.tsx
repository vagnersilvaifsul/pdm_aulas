import { EmpresaContext } from "@/context/EmpresaProvider";
import { Empresa } from "@/model/Empresa";
import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Avatar, Card, List, useTheme } from "react-native-paper";

export default function Empresas() {
	const { empresas } = useContext<any>(EmpresaContext);
	const theme = useTheme();

	function irParaTelaEmpresa(empresa: any) {
		alert(`Empresa selecionada: ${empresa.nome}`);
	}

	return (
		<View style={styles.container}>
			<List.Section
				style={{ ...styles.list, backgroundColor: theme.colors.background }}
			>
				<List.Subheader style={styles.subhearder}>
					Lista de Empresas
				</List.Subheader>
				<ScrollView>
					{empresas.map((empresa: Empresa, key: number) => (
						<Card
							key={key}
							style={{
								...styles.card,
								borderColor: theme.colors.secondary,
							}}
							onPress={() => irParaTelaEmpresa(empresa)}
						>
							<Card.Title
								title={empresa.nome}
								subtitle={empresa.tecnologias}
								left={() => (
									<Avatar.Image size={40} source={{ uri: empresa.urlFoto }} />
								)}
							/>
						</Card>
					))}
				</ScrollView>
			</List.Section>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	subhearder: {
		fontSize: 20,
		alignSelf: "center",
	},
	list: {
		width: "95%",
	},
	card: {
		height: 100,
		width: "100%",
		borderWidth: 1,
		marginBottom: 10,
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
	searchBar: {
		marginBottom: 10,
		borderWidth: 1,
	},
});
