import { AuthProvider } from "@/context/AuthProvider";
import { EmpresaProvider } from "@/context/EmpresaProvider";
import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
	return (
		<PaperProvider>
			<AuthProvider>
				<EmpresaProvider>
					<Stack
						initialRouteName="preload"
						screenOptions={{ headerShown: false }}
					>
						<Stack.Screen name="preload" />
						<Stack.Screen name="entrar" />
						<Stack.Screen name="cadastrar" />
						<Stack.Screen name="(tabs)" />
						<Stack.Screen name="empresa" />
					</Stack>
				</EmpresaProvider>
			</AuthProvider>
		</PaperProvider>
	);
}
