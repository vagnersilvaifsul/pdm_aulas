import { AuthContext } from "@/context/AuthProvider";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

//1. Configurar o manipulador de notificações
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldShowBanner: true,
		shouldShowList: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export default function Preload() {
	const theme = useTheme();
	const { recuperarCredencialdaCache, signIn } = useContext<any>(AuthContext);

	useEffect(() => {
		entrar();

		//2. Registra o dispositivo para receber notificações
		registerForPushNotificationsAsync();
		sendNotification();
	}, []);

	async function entrar(): Promise<void> {
		const credencial = await recuperarCredencialdaCache();
		if (credencial) {
			const result = await signIn(credencial);
			if (result === "ok") {
				const lastNotification =
					await Notifications.getLastNotificationResponseAsync();
				switch (lastNotification?.notification.request.content.data?.rota) {
					case "usuarios":
						router.replace("/home");
						break;
					case "empresas":
						router.replace("/empresas");
						break;
					default:
						router.replace("/home");
				}
			} else {
				//se não consegue logar vai para a tela de login
				router.replace("/entrar");
			}
		} else {
			router.replace("/entrar");
		}
	}

	async function registerForPushNotificationsAsync(): Promise<void> {
		if (Platform.OS === "android") {
			//Configura o canal de notificação para Android
			await Notifications.setNotificationChannelAsync("padrao", {
				name: "padrao",
				importance: Notifications.AndroidImportance.HIGH, // som e banner
			});
		}

		//3. Solicitar permissões de notificação
		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;

			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				handleRegistrationError(
					"Permissão negada. Você não receberá notificações até que a permissão seja concedida.",
				);
				return;
			}
		}
	}

	function handleRegistrationError(errorMessage: string) {
		alert(errorMessage);
		throw new Error(errorMessage);
	}

	const sendNotification = () => {
		Notifications.scheduleNotificationAsync({
			content: {
				title: "🧪 Título In App",
				body: "Este é o corpo da Notificação In App!!!.",
			},
			trigger: {
				type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
				seconds: 1,
			},
		});
	};

	return (
		<SafeAreaView
			style={{ ...styles.container, backgroundColor: theme.colors.background }}
		>
			<Image
				style={styles.imagem}
				source={require("../../assets/images/logo512.png")}
				accessibilityLabel="logo do app"
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	imagem: {
		width: 250,
		height: 250,
	},
});
