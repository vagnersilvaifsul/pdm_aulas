import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import { useTheme } from "react-native-paper";

export default function Empresa() {
	const theme = useTheme();
	const { empresa } = useLocalSearchParams<{ empresa: string }>();

	console.log(empresa);

	return (
		<SafeAreaView>
			<Text>Empresa</Text>
		</SafeAreaView>
	);
}
