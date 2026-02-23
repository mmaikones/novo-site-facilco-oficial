import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = (import.meta.env.VITE_GEMINI_API_KEY as string | undefined)?.trim();
const MODEL_NAME = "gemini-2.0-flash";

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

export const generateResponse = async (userPrompt: string, imageBase64?: string, mimeType?: string): Promise<string> => {
  try {
    if (!API_KEY) {
      console.error("Gemini API key ausente. Defina VITE_GEMINI_API_KEY.");
      return "A IA está temporariamente indisponível. Verifique a configuração da chave de API.";
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    // Choose the appropriate model
    // Note: Gemini 1.5 Flash is efficient and supports vision
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_INSTRUCTION
    });

    // Prepare prompt parts
    const promptParts: any[] = [userPrompt || "Analise esta imagem tecnicamente como um auditor de segurança."];

    // Add image if present
    if (imageBase64 && mimeType) {
      promptParts.push({
        inlineData: {
          data: imageBase64,
          mimeType: mimeType
        }
      });
    }

    const result = await model.generateContent(promptParts);
    const response = await result.response;
    const text = response.text();

    return text;

  } catch (error: any) {
    console.error("Gemini API Error Detail:", error);

    // Customize error message based on common issues
    if (error.message?.includes('API key')) {
      return "Erro de autenticação com a IA. Por favor, verifique a chave de API.";
    }

    return "Ocorreu um erro ao processar sua solicitação. Se enviou uma imagem, tente uma resolução menor ou formato diferente.";
  }
};
