import { AuthProvider } from "@/context/AuthProvider";
import { Stack } from "expo-router";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

//Ampliando o tema padrão
const themeLight = {
	...MD3LightTheme,
	colors: {
		...MD3LightTheme.colors,
		primary: "#00b2ee",
		white: "#ffffff",
		black: "#000000",
	},
};

const themeDark = {
	...MD3DarkTheme,
	colors: {
		...MD3DarkTheme.colors,
		primary: "#eec200",
		white: "#ffffff",
		black: "#000000",
	},
};

export default function RootLayout() {
	const colorScheme = useColorScheme();

	return (
		<PaperProvider theme={colorScheme === "dark" ? themeDark : themeLight}>
			<AuthProvider>
				<Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
					<Stack.Screen name="index" />
					<Stack.Screen name="entrar" />
					<Stack.Screen name="cadastrar" />
					<Stack.Screen name="(tabs)" />
				</Stack>
			</AuthProvider>
		</PaperProvider>
	);
}
