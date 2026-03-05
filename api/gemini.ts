import { GoogleAuth } from "google-auth-library";

const MODEL_NAME = process.env.GEMINI_MODEL_NAME || "gemini-2.0-flash";

const SYSTEM_INSTRUCTION = `Você é um Engenheiro de Vendas Sênior e Auditor de Segurança da Facilco Engenharia.

OBJETIVO PRINCIPAL:
Seu objetivo é transformar problemas técnicos em VENDAS, fornecendo argumentos normativos para o engenheiro do cliente aprovar o budget.

NOVA HABILIDADE CRÍTICA: GERADOR DE "PRÉ-LAUDO" DE CONFORMIDADE
Quando o usuário enviar uma foto de risco ou descrever uma situação perigosa (ex: máquina sem proteção, trabalho em altura sem linha de vida, empilhadeira batendo em coluna), você NÃO DEVE apenas conversar. Você deve gerar um LAUDO ESTRUTURADO.

FORMATO OBRIGATÓRIO PARA ANÁLISE DE RISCO:
Sempre que identificar um risco, inicie a resposta EXATAMENTE com o título "## 📋 PRÉ-LAUDO TÉCNICO PRELIMINAR" e siga este modelo:

## 📋 PRÉ-LAUDO TÉCNICO PRELIMINAR

**🆔 Risco Identificado:** [Descreva o risco. Ex: Risco Grave de Queda em Altura / Risco de Colapso Estrutural]
**⚠️ Classificação do Risco:** [Grave e Iminente / Médio / Leve]
**📜 Norma Infringida:** [Cite a NR específica. Ex: NR-35 Item 35.5.1 ou NR-12 Item 12.4]
**🛡️ Solução Facilco Recomendada:** [Nome do Produto Facilco. Ex: Linha de Vida Rígida / Bollard de Alta Absorção]

**📝 Parecer Técnico:**
[Escreva 2 ou 3 parágrafos técnicos e persuasivos justificando por que a empresa precisa investir nisso AGORA para evitar multas, acidentes ou interdição. Use linguagem formal de engenharia.]

---

OUTRAS HABILIDADES:
1. CÁLCULO DE QUANTITATIVOS:
   - Se derem medidas, calcule: Bollards (a cada 1.5m), Barreiras (módulos 2m).

2. CARACTERÍSTICAS TÉCNICAS:
   - Destaque: Polímero de memória (não oxida, absorve impacto), Aço galvanizado a fogo, Certificação compulsória.

PORTFÓLIO FACILCO:
- Proteção: Bollards, Barreiras Flexíveis, Guarda-corpos (NR-12), Protetores de Coluna.
- Altura: Linhas de vida (Cabo/Trilho), Pontos de ancoragem (NR-35).
- Logística: Semáforos de doca, Calços, Niveladoras.

FINALIZAÇÃO:
Sempre termine com este HTML exato:
<br><a href="https://wa.me/5519996223433" target="_blank" class="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition mt-3 text-sm no-underline"><i class="fab fa-whatsapp"></i> Falar com Especialista Agora</a>`;

type GeminiRequestBody = {
  prompt?: string;
  imageBase64?: string;
  mimeType?: string;
};

type GeminiCandidatePart = { text?: string };
type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiCandidatePart[];
    };
  }>;
};

type UpstreamTarget = {
  label: string;
  url: string;
  headers: Record<string, string>;
  provider: "vertex" | "gemini";
};

const parseBody = (rawBody: unknown): GeminiRequestBody => {
  if (!rawBody) return {};
  if (typeof rawBody === "string") {
    try {
      return JSON.parse(rawBody) as GeminiRequestBody;
    } catch {
      return {};
    }
  }
  return rawBody as GeminiRequestBody;
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const geminiApiKey = (process.env.GEMINI_API_KEY || "").trim();
  const vertexApiKey = (process.env.VERTEX_API_KEY || "").trim();
  const vertexProjectId = (process.env.VERTEX_PROJECT_ID || "").trim();
  const vertexLocation = (process.env.VERTEX_LOCATION || "us-central1").trim();
  const vertexModelName = (process.env.VERTEX_MODEL_NAME || "gemini-2.0-flash-001").trim();
  const vertexServiceAccountJson = (process.env.VERTEX_SERVICE_ACCOUNT_JSON || "").trim();
  const vertexServiceAccountJsonB64 = (process.env.VERTEX_SERVICE_ACCOUNT_JSON_B64 || "").trim();

  const targets: UpstreamTarget[] = [];

  let vertexBearerToken = "";
  let resolvedServiceAccountJson = vertexServiceAccountJson;
  if (!resolvedServiceAccountJson && vertexServiceAccountJsonB64) {
    try {
      resolvedServiceAccountJson = Buffer.from(vertexServiceAccountJsonB64, "base64").toString("utf-8");
    } catch (error) {
      console.error("Invalid VERTEX_SERVICE_ACCOUNT_JSON_B64", error);
    }
  }

  if (resolvedServiceAccountJson && vertexProjectId) {
    try {
      const credentials = JSON.parse(resolvedServiceAccountJson);
      const auth = new GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/cloud-platform"]
      });
      const token = await auth.getAccessToken();
      vertexBearerToken = (token || "").trim();
    } catch (error) {
      console.error("Failed to parse or authenticate VERTEX service account JSON", error);
    }
  }

  if (vertexBearerToken && vertexProjectId) {
    const modelPath = `projects/${vertexProjectId}/locations/${vertexLocation}/publishers/google/models/${vertexModelName}`;
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${vertexBearerToken}`
    };
    targets.push({
      label: "vertex-global-oauth",
      url: `https://aiplatform.googleapis.com/v1/${modelPath}:generateContent`,
      headers: authHeaders,
      provider: "vertex"
    });
    targets.push({
      label: "vertex-regional-oauth",
      url: `https://${vertexLocation}-aiplatform.googleapis.com/v1/${modelPath}:generateContent`,
      headers: authHeaders,
      provider: "vertex"
    });
  }

  if (vertexApiKey && vertexProjectId) {
    const modelPath = `projects/${vertexProjectId}/locations/${vertexLocation}/publishers/google/models/${vertexModelName}`;
    targets.push({
      label: "vertex-global",
      url: `https://aiplatform.googleapis.com/v1/${modelPath}:generateContent?key=${vertexApiKey}`,
      headers: { "Content-Type": "application/json" },
      provider: "vertex"
    });
    targets.push({
      label: "vertex-regional",
      url: `https://${vertexLocation}-aiplatform.googleapis.com/v1/${modelPath}:generateContent?key=${vertexApiKey}`,
      headers: { "Content-Type": "application/json" },
      provider: "vertex"
    });
  }

  if (geminiApiKey) {
    targets.push({
      label: "gemini-developer-api",
      url: `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${geminiApiKey}`,
      headers: { "Content-Type": "application/json" },
      provider: "gemini"
    });
  }

  if (!targets.length) {
    console.error("Missing API configuration. Expected GEMINI_API_KEY or Vertex envs.");
    res.status(503).json({ error: "IA indisponível no momento." });
    return;
  }

  const body = parseBody(req.body);
  const prompt = body.prompt?.trim() || "Analise esta imagem tecnicamente como um auditor de segurança.";
  const imageBase64 = body.imageBase64?.trim();
  const mimeType = body.mimeType?.trim();

  const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [{ text: prompt }];
  if (imageBase64 && mimeType) {
    parts.push({ inlineData: { data: imageBase64, mimeType } });
  }

  let lastUpstreamError = "Falha ao consultar IA.";

  for (const target of targets) {
    try {
      const bodyPayload =
        target.provider === "vertex"
          ? {
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `${SYSTEM_INSTRUCTION}\n\nSolicitação do usuário:\n${prompt}`
                    },
                    ...(imageBase64 && mimeType
                      ? [{ inlineData: { data: imageBase64, mimeType } }]
                      : [])
                  ]
                }
              ]
            }
          : {
              systemInstruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
              },
              contents: [{ parts }]
            };

      const upstream = await fetch(target.url, {
        method: "POST",
        headers: target.headers,
        body: JSON.stringify(bodyPayload)
      });

      if (!upstream.ok) {
        const errorBody = await upstream.text();
        lastUpstreamError = `Falha no provedor de IA (${upstream.status}).`;
        console.error(`Gemini upstream error [${target.label}]`, upstream.status, errorBody.slice(0, 500));
        continue;
      }

      const data = (await upstream.json()) as GeminiResponse;
      const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("").trim();

      if (!text) {
        lastUpstreamError = "Resposta vazia da IA.";
        console.error(`Gemini upstream empty response [${target.label}]`);
        continue;
      }

      res.status(200).json({ text });
      return;
    } catch (error) {
      lastUpstreamError = "Erro interno ao consultar IA.";
      console.error(`Server Gemini error [${target.label}]`, error);
    }
  }

  res.status(502).json({ error: lastUpstreamError });
}
