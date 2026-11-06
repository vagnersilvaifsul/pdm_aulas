// Cloud Functions do pdm-exemplo-expo: código que roda no SERVIDOR do
// Firebase, não no app. Usa o Admin SDK, que tem a credencial do próprio
// projeto: não passa pelas regras de segurança e pode enviar mensagens
// pelo FCM (Firebase Cloud Messaging) — por isso o envio fica aqui, e
// nunca no app.

import { initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";
import { getMessaging } from "firebase-admin/messaging";
import { setGlobalOptions } from "firebase-functions";
import * as logger from "firebase-functions/logger";
import {
  onDocumentCreatedWithAuthContext,
} from "firebase-functions/v2/firestore";

initializeApp();

// Mesma região do Firestore (o gatilho do banco precisa estar nela) e,
// para controlar custos, no máximo 10 instâncias ao mesmo tempo.
setGlobalOptions({ region: "southamerica-east1", maxInstances: 10 });

// GATILHO: roda sozinha toda vez que um documento é CRIADO em empresas.
// "WithAuthContext" informa também quem criou (authId), para não
// notificar o próprio autor.
// Erros do FCM que indicam que o token não vale mais (app desinstalado,
// token expirado etc.). Esses tokens são apagados do Firestore.
const TOKEN_INVALIDO = [
	"messaging/invalid-registration-token",
	"messaging/registration-token-not-registered",
];

// O sendEachForMulticast aceita no máximo 500 tokens por chamada.
const TOKENS_POR_ENVIO = 500;

// GATILHO: roda sozinha toda vez que um documento é CRIADO em empresas.
// "WithAuthContext" informa também quem criou (authId), para não
// notificar o próprio autor.
export const notificarNovaEmpresa = onDocumentCreatedWithAuthContext(
	"empresas/{empresaId}",
	async (evento) => {
		const empresa = evento.data?.data();
		if (!empresa) return;

		// Destinatários: todos os usuários que têm o app instalado, ou seja,
		// que já tiveram o token do dispositivo gravado pelo FcmProvider.tsx
		const db = getFirestore();
		const usuarios = await db
			.collection("usuarios")
			.where("token_fcm", "!=", null)
			.get();
		const destinatarios = usuarios.docs.filter(
			(usuario) => usuario.id !== evento.authId,
		);
		if (destinatarios.length === 0) {
			logger.info("Nenhum dispositivo para notificar.");
			return;
		}

		const lote = db.batch();
		let sucessos = 0;
		let falhas = 0;

		// Envia em grupos de até 500 tokens
		for (let inicio = 0; inicio < destinatarios.length; inicio += TOKENS_POR_ENVIO) {
			const grupo = destinatarios.slice(inicio, inicio + TOKENS_POR_ENVIO);

			// Uma mensagem para vários tokens. "notification" é o que aparece
			// na barra; "data" vai escondido para o app: "rota" diz qual tela
			// abrir ao tocar na notificação (app/index.tsx) e o id identifica a empresa.
			const resposta = await getMessaging().sendEachForMulticast({
				tokens: grupo.map((destinatario) => destinatario.get("token_fcm")),
				notification: {
					title: "Nova empresa",
					body: `${empresa.nome} acaba de ser cadastrada.`,
				},
				data: { rota: "empresas", empresaId: evento.params.empresaId },
				// Mesmo canal criado no app (app/index.tsx)
				android: { priority: "high", notification: { channelId: "default" } },
			});
			sucessos += resposta.successCount;
			falhas += resposta.failureCount;

			// Limpeza: apaga dos usuários os tokens que o FCM recusou como inválidos
			// (a resposta vem na mesma ordem dos tokens enviados)
			resposta.responses.forEach((envio, i) => {
				if (envio.error && TOKEN_INVALIDO.includes(envio.error.code)) {
					lote.update(grupo[i].ref, { token_fcm: FieldValue.delete() });
				}
			});
		}

		logger.info(
			`Notificação enviada: ${sucessos} sucesso(s), ${falhas} falha(s).`,
		);
		await lote.commit();
	},
);