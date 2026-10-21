export async function buscarCep(cep: string): Promise<string | null> {
	try {
		const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
		if (!response.ok) {
			console.error("Erro ao buscar o CEP:", response);
			return null;
		}
		const data = await response.json();
		if (data.erro) {
			return null;
		}
		return JSON.stringify(data);
	} catch (error) {
		console.error("Erro ao buscar o CEP:", error);
		return null;
	}
}

export async function buscarCoordendadasPeloEndereco(
	endereco: string,
): Promise<string | null> {
	try {
		const url = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${process.env.GOOGLE_MAPS_API_KEY}`;
		const body = {
			address: {
				regionCode: "BR",
				addressLines: [`${endereco}`],
			},
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		};
		const response = await fetch(url, options);
		if (!response.ok) {
			console.error("Erro ao buscar coordenadas:", response);
			return null;
		}
		const data = await response.json();
		if (data.erro) {
			return null;
		}
		return JSON.stringify(data);
	} catch (error) {
		console.error("Erro ao buscar coordenadas:", error);
		return null;
	}
}
