import { Text, View } from "react-native";

export function MeuBotao({
	texto,
	aoClicar,
}: {
	texto: string;
	aoClicar: () => void;
}) {
	console.log(texto);

	return (
		<View>
			<Text onPress={aoClicar}>{texto}</Text>
		</View>
	);
}
