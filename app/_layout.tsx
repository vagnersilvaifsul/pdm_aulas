import { AuthProvider } from "@/context/AuthProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
	return (
		<AuthProvider>
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
		</AuthProvider>
	);
}
