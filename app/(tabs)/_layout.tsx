import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tabs.Screen name="home" />
			<Tabs.Screen name="pagina2" />
		</Tabs>
	);
}
