import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider } from "@/context/AuthProvider";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";

//Ampliando o tema padrão
const themeLight = {
	...MD3LightTheme,
	colors: {
		primary: "#E374E6",
	},
};

const themeDark = {
	...MD3DarkTheme,
};

const temaDoApp = true; //true = claro, false = escuro

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	if (!loaded) {
		// Async font loading only occurs in development.
		return null;
	}

	return (
		<PaperProvider theme={temaDoApp ? themeLight : themeDark}>
			<AuthProvider>
				<Stack initialRouteName="index">
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
				<StatusBar style="auto" />
			</AuthProvider>
		</PaperProvider>
	);
}
