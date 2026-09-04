import { AuthProvider } from "@/context/AuthProvider";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
	return (
		<PaperProvider>
			<AuthProvider>
				<Stack
					initialRouteName="preload"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name="preload" />
					<Stack.Screen name="entrar" />
					<Stack.Screen name="cadastrar" />
					<Stack.Screen name="(tabs)" />
				</Stack>
			</AuthProvider>
		</PaperProvider>
	);
}
