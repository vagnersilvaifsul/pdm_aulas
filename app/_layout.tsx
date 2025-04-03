import { AuthProvider } from "@/context/AuthProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

//Ampliando o tema padrão
const themeLight = {
	...MD3LightTheme,
};

const themeDark = {
	...MD3DarkTheme,
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<PaperProvider theme={colorScheme === "dark" ? themeDark : themeLight}>
			<AuthProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				></Stack>
				<StatusBar style="auto" />
			</AuthProvider>
		</PaperProvider>
	);
}
