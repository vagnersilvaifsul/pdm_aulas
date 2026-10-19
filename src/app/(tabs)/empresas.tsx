import { EmpresaContext } from "@/context/EmpresaProvider";
import { Empresa } from "@/model/Empresa";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
	Avatar,
	Card,
	FAB,
	List,
	Searchbar,
	useTheme,
} from "react-native-paper";

export default function Empresas() {
	const { empresas, getEmpresasByName } = useContext<any>(EmpresaContext);
	const [empresasSearch, setEmpresasSearch] = useState<Empresa[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const theme = useTheme();

	function irParaTelaEmpresa(empresa: any) {
		router.push({
			pathname: "/empresa",
			params: { empresa: JSON.stringify(empresa) },
		});
		clearSearch();
	}

	async function SearchQuery(): Promise<void> {
		const result = await getEmpresasByName(searchQuery);
		if (result.length > 0) {
			setEmpresasSearch(result);
		} else {
			setEmpresasSearch([]);
		}
	}

	function clearSearch() {
		setSearchQuery("");
		setEmpresasSearch([]);
	}

	return (
		<View style={styles.container}>
			<List.Section
				style={{ ...styles.list, backgroundColor: theme.colors.background }}
			>
				<List.Subheader style={styles.subhearder}>
					Lista de Empresas
				</List.Subheader>
				<Searchbar
					style={{
						...styles.searchBar,
						backgroundColor: theme.colors.background,
					}}
					onChangeText={(query) => setSearchQuery(query)}
					onSubmitEditing={SearchQuery}
					onClearIconPress={clearSearch}
					value={searchQuery}
				/>
				<ScrollView>
					{empresasSearch.length > 0
						? empresasSearch.map((empresa: Empresa, key: number) => (
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
											<Avatar.Image
												size={40}
												source={{ uri: empresa.urlFoto }}
											/>
										)}
									/>
								</Card>
							))
						: empresas.map((empresa: Empresa, key: number) => (
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
											<Avatar.Image
												size={40}
												source={{ uri: empresa.urlFoto }}
											/>
										)}
									/>
								</Card>
							))}
				</ScrollView>
			</List.Section>
			<FAB
				icon="plus"
				style={styles.fab}
				onPress={() => irParaTelaEmpresa(null)}
			/>
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
