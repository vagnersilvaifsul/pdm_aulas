import { AuthProvider } from "@/context/AuthProvider";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
	return (
		<PaperProvider>
			<AuthProvider>
				<Stack initialRouteName="entrar" screenOptions={{ headerShown: false }}>
					<Stack.Screen name="entrar" />
					<Stack.Screen name="(tabs)" />
				</Stack>
			</AuthProvider>
		</PaperProvider>
	);
}
