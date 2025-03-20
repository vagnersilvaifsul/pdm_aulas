import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function Botao(props: any) {
	console.log(props);

	return (
		<TouchableHighlight style={styles.botao} onPress={props.aoClicar}>
			<Text style={{ color: "white" }}>{props.titulo}</Text>
		</TouchableHighlight>
	);
}

export default function Home() {
	const [cont, setCont] = useState(0);

	//Ao montar o componente
	useEffect(() => {
		console.log("Home mounted");

		return () => {
			console.log("Home unmounted");
		};
	}, []);

	//Atualizou a view ao alterar o valor da state ob
	useEffect(() => {
		console.log("Atualizou a state cont");
	}, [cont]);

	//Todas as atualizações do componente
	useEffect(() => {
		console.log("Pega todas as atualizações do componente");
	});

	function incrementar() {
		setCont(cont + 1);
	}

	function decrementar() {
		setCont(cont - 1);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.texto}>Contador={cont}</Text>
			<Botao titulo="Incrementar" aoClicar={incrementar} />
			<Botao titulo="Decrementar" aoClicar={decrementar} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	texto: {
		fontSize: 40,
		color: "blue",
	},
	botao: {
		backgroundColor: "red",
		marginTop: 20,
		width: 100,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
});
