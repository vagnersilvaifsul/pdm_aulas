import { Tabs } from "expo-router";

export default function TabsLayout() {
	return (
		<Tabs initialRouteName="home">
			<Tabs.Screen name="home" />
			<Tabs.Screen name="pagina2" />
		</Tabs>
	);
}
