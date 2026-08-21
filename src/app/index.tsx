import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
export default function Index() {
	return (
		<View style={styles.container}>
			<TextInput
				style={styles.textinput}
				label="Email"
				placeholder="Digite seu email"
				mode="outlined"
				autoCapitalize="none"
				returnKeyType="next"
				keyboardType="email-address"
				onChangeText={(text) => {
					console.log(text);
				}}
			/>
			<TextInput
				style={styles.textinput}
				label="Senha"
				placeholder="Digite sua senha"
				mode="outlined"
				autoCapitalize="none"
				returnKeyType="go"
				secureTextEntry
				onChangeText={(text) => {
					console.log(text);
				}}
			/>
			<Button
				style={styles.button}
				mode="contained"
				onPress={() => console.log("Entrar")}
			>
				Entrar
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	textinput: {
		width: 350,
		height: 50,
		marginTop: 20,
		backgroundColor: "transparent",
	},
	button: {
		marginTop: 50,
		marginBottom: 30,
	},
});
