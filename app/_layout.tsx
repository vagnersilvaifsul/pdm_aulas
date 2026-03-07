import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack initialRouteName="entrar">
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="entrar" />
			<Stack.Screen name="cadastrar" />
		</Stack>
	);
}
