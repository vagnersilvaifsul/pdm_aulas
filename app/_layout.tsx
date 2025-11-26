import { AuthProvider } from "@/context/AuthProvider";
import { EmpresaProvider } from "@/context/EmpresaProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

//Ampliando o tema padrão
const themeLight = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		primary: "#E374E6",
		white: "#ffffff",
		black: "#000000",
	},
};

const themeDark = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		white: "#ffffff",
		black: "#000000",
	},
};

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});
	const colorScheme = useColorScheme();

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<PaperProvider theme={colorScheme === "dark" ? themeDark : themeLight}>
			<AuthProvider>
				<EmpresaProvider>
					<Stack
						initialRouteName="index"
						screenOptions={{
							headerShown: false,
						}}
					>
						<Stack.Screen name="index" />
						<Stack.Screen name="(tabs)" />
						<Stack.Screen name="signIn" />
						<Stack.Screen name="signUp" />
						<Stack.Screen name="empresa" />
					</Stack>
					<StatusBar style="auto" />
				</EmpresaProvider>
			</AuthProvider>
		</PaperProvider>
	);
}
