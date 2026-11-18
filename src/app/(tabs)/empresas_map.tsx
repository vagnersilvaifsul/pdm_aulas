import { EmpresaContext } from "@/context/EmpresaProvider";
import { Empresa } from "@/model/Empresa";
import { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { MapType, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, Icon, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

/*
    1. Para que funcione o mapa é necessário instalar o react-native-maps e ativar o Maps SDK for Android no console do GCP.
    Para abrir o console do GCP para o seu projeto, vá no Cosole do Firebase > Clique na engrenagem ao lado de "Visão Geral do Projeto"
    > Vá na Guia "Constas e serviço" > Vá em "Todas as contas de serviço" e clique no link com o ícone do GCP.
    No Dashboard do GCP confira se o nome do projeto é o mesmo none que você criou no Firebase (no campo de input, acima à esquerda).
    Se você estiver no projeto correto, faça uma pesquisa por "Google Maps SDK for Android" e ative o serviço (confira se foi ativado).
		2. Adicione a chave de API do Google Maps (que você gerou no passo 1) no arquivo app.json, como manda a documentação do react-native-maps.
		3. Faça um rebuild do projeto com EAS (gere um novo APK) e instale o APK no seu dispositivo. Ah! Lembre de deixar disponível para o git o arquivo google-services.json
*/

export default function EmpresasMap() {
	const [mapType, setMapType] = useState<MapType>("satellite"); //standard, satellite
	const { empresas } = useContext<any>(EmpresaContext);
	const theme = useTheme();
	// console.log(empresas);
	return (
		<SafeAreaView style={styles.container}>
			<MapView
				style={styles.map}
				provider={PROVIDER_GOOGLE}
				mapType={mapType}
				followsUserLocation={true}
				showsUserLocation={true}
				showsMyLocationButton={true}
				initialRegion={{
					//região onde deve focar o mapa na inicialização
					latitude: -31.766453286495448,
					longitude: -52.351914793252945,
					latitudeDelta: 0.0015, //baseado na documentação
					longitudeDelta: 0.00121, //baseado na documentação
				}}
			>
				{/* Só desenha empresas que já têm coordenadas: no cadastro elas chegam
				    sem latitude/longitude, que a Cloud Function geocodificarEmpresa
				    preenche depois (ou não preenche, se não achar o endereço) */}
				{empresas
					.filter(
						(empresa: Empresa) =>
							typeof empresa.latitude === "number" &&
							typeof empresa.longitude === "number",
					)
					.map((empresa: Empresa) => {
						return (
							<Marker
								key={empresa.uid}
								coordinate={{
									latitude: empresa.latitude,
									longitude: empresa.longitude,
								}}
								title={empresa.nome}
								description={empresa.tecnologias}
								draggable
							>
								<Icon
									source="office-building-marker"
									color={
										mapType === "standard"
											? theme.colors.primary
											: theme.colors.black
									}
									size={55}
								/>
							</Marker>
						);
					})}
			</MapView>
			<Button
				style={styles.button}
				mode={mapType === "standard" ? "contained" : "outlined"}
				buttonColor={
					mapType === "standard" ? theme.colors.primary : theme.colors.white
				}
				textColor={
					mapType === "standard" ? theme.colors.white : theme.colors.black
				}
				onPress={() =>
					mapType === "standard"
						? setMapType("satellite")
						: setMapType("standard")
				}
			>
				{mapType === "standard" ? "Standard" : "satellite"}
			</Button>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
	button: {
		position: "absolute",
		margin: 15,
		alignSelf: "center",
		bottom: 0,
	},
});
