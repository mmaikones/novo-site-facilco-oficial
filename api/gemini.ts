import { GoogleAuth } from "google-auth-library";
import fs from "node:fs/promises";
import path from "node:path";

const MODEL_NAME = process.env.GEMINI_MODEL_NAME || "gemini-2.0-flash";
const KNOWLEDGE_FILE_PATH = path.join(process.cwd(), "data", "knowledge", "site-scrape.json");

const SYSTEM_INSTRUCTION = `Você é a Assistente Técnica Virtual da Facilco Engenharia. Responda sempre em português do Brasil.

PAPEL:
- Atender diretamente clientes finais da Facilco.
- Explicar serviços e soluções técnicas da Facilco com clareza, objetividade e foco em segurança.
- Apoiar triagem técnica inicial (pré-laudo), sem substituir laudo oficial com ART.

REGRAS CRÍTICAS:
- Nunca diga que ajuda o usuário a vender para terceiros.
- Nunca use narrativa de "aprovar budget", "fechar venda" ou "argumento de vendas para cliente final de outra empresa".
- Foque no cenário real do próprio solicitante: risco, conformidade, operação e solução técnica.
- Se faltarem dados, faça perguntas curtas e específicas antes de concluir.
- Não invente normas, dados técnicos ou promessas de desempenho.

BASE DE CONHECIMENTO PRIORITÁRIA (SITE FACILCO):
1) Catálogo de logística e docas:
- Rampa Niveladora de Docas
- Rampa Móvel de Carga/Descarga
- Batente para Docas (Dock Bumper)
- Bate Rodas Limitador
- Dock Light (Iluminação de Doca)
- Sinalização de Docas Inteligente

2) Proteção industrial:
- Protetores de Coluna Porta Pallet
- Bollards de proteção (balizadores)
- Barreiras de proteção
- Guarda-corpo industrial

3) Trabalho em altura e acesso seguro:
- Linha de Vida e sistemas de ancoragem (NR-35)
- Escada marinheiro com guarda-corpo
- Pontos de ancoragem e proteção coletiva

4) Serviços e engenharia:
- Adequação técnica e conformidade normativa (ex.: NR-12 e NR-35)
- Projetos, instalações e suporte técnico para operações industriais e logísticas

QUANDO O USUÁRIO ENVIAR FOTO OU DESCREVER RISCO:
- Gere análise estruturada iniciando EXATAMENTE com:
## 📋 PRÉ-LAUDO TÉCNICO PRELIMINAR

Use este formato:
**🆔 Risco Identificado:** [descrição objetiva]
**⚠️ Classificação do Risco:** [grave e iminente / alto / moderado / baixo]
**📜 Norma Relacionada (preliminar):** [NR e item quando aplicável]
**🛡️ Solução Facilco Recomendada:** [produto/serviço do portfólio]
**📝 Parecer Técnico:** [diagnóstico objetivo + ação recomendada + prioridade]

OUTRAS HABILIDADES:
1. Cálculo preliminar de quantitativos:
- Bollards: espaçamento inicial de referência de 1,5 m.
- Barreiras modulares: referência inicial de módulos de 2 m.

2. Direcionamento técnico:
- Explique aplicação, benefícios e limitações de cada solução sem exageros comerciais.

FINALIZAÇÃO:
Quando fizer sentido, termine com este HTML exato:
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

type SiteKnowledgePage = {
  path: string;
  url: string;
  title?: string;
  headings?: string[];
  text?: string;
};

type SiteKnowledgePayload = {
  pages?: SiteKnowledgePage[];
};

const SEARCH_STOPWORDS = new Set([
  "a",
  "o",
  "as",
  "os",
  "de",
  "do",
  "da",
  "dos",
  "das",
  "e",
  "em",
  "na",
  "no",
  "nas",
  "nos",
  "por",
  "para",
  "com",
  "sem",
  "um",
  "uma",
  "uns",
  "umas",
  "que",
  "como",
  "sobre",
  "qual",
  "quais",
  "me",
  "minha",
  "meu",
  "preciso",
  "quero",
  "ajuda"
]);

let cachedSiteKnowledge: SiteKnowledgePage[] | null | undefined;

const normalizeForSearch = (value: string) =>
  value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const loadSiteKnowledge = async (): Promise<SiteKnowledgePage[] | null> => {
  if (cachedSiteKnowledge !== undefined) return cachedSiteKnowledge;

  try {
    const raw = await fs.readFile(KNOWLEDGE_FILE_PATH, "utf-8");
    const payload = JSON.parse(raw) as SiteKnowledgePayload;
    const pages = Array.isArray(payload.pages) ? payload.pages : [];
    cachedSiteKnowledge = pages;
    return cachedSiteKnowledge;
  } catch (error) {
    cachedSiteKnowledge = null;
    console.warn("Knowledge base file unavailable", error);
    return null;
  }
};

const buildKnowledgeContext = async (prompt: string): Promise<string> => {
  const pages = await loadSiteKnowledge();
  if (!pages?.length) return "";

  const tokens = Array.from(
    new Set(
      normalizeForSearch(prompt)
        .split(" ")
        .map((token) => token.trim())
        .filter((token) => token.length >= 3 && !SEARCH_STOPWORDS.has(token))
    )
  );

  if (!tokens.length) return "";

  const ranked = pages
    .map((page) => {
      const haystack = normalizeForSearch(`${page.title || ""} ${(page.headings || []).join(" ")} ${page.text || ""}`);
      let score = 0;

      for (const token of tokens) {
        if (!haystack.includes(token)) continue;
        const occurrences = haystack.split(token).length - 1;
        score += occurrences * Math.min(token.length, 12);
      }

      return { page, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  if (!ranked.length) return "";

  const lines = ranked.map(({ page }, index) => {
    const title = page.title?.trim() || page.path;
    const headings = (page.headings || []).slice(0, 8).join(" | ");
    const excerpt = (page.text || "").slice(0, 1300).trim();

    return `[Fonte ${index + 1}] Página: ${page.path}
Título: ${title}
Tópicos: ${headings || "N/A"}
Trecho: ${excerpt}`;
  });

  return `CONHECIMENTO INTERNO RASPADO DO SITE FACILCO (use como base factual):
${lines.join("\n\n")}`;
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

  const knowledgeContext = await buildKnowledgeContext(prompt);
  const promptWithContext = knowledgeContext
    ? `${knowledgeContext}\n\nSolicitação do usuário:\n${prompt}`
    : `Solicitação do usuário:\n${prompt}`;

  const parts: Array<{ text: string } | { inlineData: { data: string; mimeType: string } }> = [{ text: promptWithContext }];
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
                      text: `${SYSTEM_INSTRUCTION}\n\n${promptWithContext}`
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
