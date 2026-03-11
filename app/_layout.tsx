import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<Stack
			initialRouteName="entrar"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name="(tabs)" />
			<Stack.Screen name="entrar" />
			<Stack.Screen name="cadastrar" />
		</Stack>
	);
}
