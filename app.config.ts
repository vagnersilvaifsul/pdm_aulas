import type { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "pdm_aulas",
  slug: "pdm_aulas",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "pdmaulas",
  userInterfaceStyle: "automatic",
  ios: {
    icon: "./assets/expo.icon",
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    predictiveBackGestureEnabled: false,
    package: "com.vagnersilva.pdm_aulas",
    googleServicesFile:
			process.env.GOOGLE_SERVICES_JSON ?? "./google-services.json",
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#208AEF",
        image: "./assets/images/splash-icon.png",
        imageWidth: 76,
      },
    ],
    "expo-secure-store",
    [
			"expo-image-picker",
			{
				cameraPermission:
					"Permita que o uso da câmera para tirar a foto.",
				microphonePermission: false,
			},
		],
	[
			"expo-notifications",
			{
				// Canal usado pelas mensagens do FCM que não indicam um canal
				// (o mesmo criado pelo notificacaoService)
				defaultChannel: "padrao",
				// Cor do ícone na barra de notificações (verde do tema)
				color: "#2F7D32",
			},
		],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "b11d0b1f-a696-4080-bbcc-5cf249aafede",
    },
  },
};

export default config;
