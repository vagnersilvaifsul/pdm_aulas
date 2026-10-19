import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Icon, useTheme } from "react-native-paper";

export default function TabsLayout() {
	const theme = useTheme();
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				tabBarActiveTintColor: theme.colors.primary,
				headerShown: false,
				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: "absolute",
					},
					default: { backgroundColor: theme.colors.background },
				}),
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Estudantes",
					tabBarIcon: ({ focused }) => (
						<Icon
							source="account-group"
							size={20}
							color={
								focused ? theme.colors.primary : theme.colors.onSurfaceVariant
							}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="empresas"
				options={{
					title: "Empresas",
					tabBarIcon: ({ focused }) => (
						<Icon
							source="office-building-outline"
							size={20}
							color={
								focused ? theme.colors.primary : theme.colors.onSurfaceVariant
							}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="menu"
				options={{
					title: "Menu",
					tabBarIcon: ({ focused }) => (
						<Icon
							source="menu"
							size={20}
							color={
								focused ? theme.colors.primary : theme.colors.onSurfaceVariant
							}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
