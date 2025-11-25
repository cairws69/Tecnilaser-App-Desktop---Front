const API_KEY = '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';
import { getDatabaseSnapshot } from './aiDatabaseService';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Contexto do sistema - define o papel da IA
const SYSTEM_CONTEXT = `Você é uma assistente técnica para um técnico de uma loja de reparo de conserto de televisões e microondas, não precise passar alternativas de ajustes simples, apenas mais técnicos, por exemplo, troca de uma peça específica. 

Suas responsabilidades incluem:

SUPORTE TÉCNICO:
- Fornecer diagnósticos detalhados de problemas em TVs (LCD, LED, OLED, Plasma) e microondas
- Sugerir soluções técnicas específicas, incluindo componentes que podem estar defeituosos
- Orientar sobre testes e medições com multímetro (tensão, continuidade, resistência)
- Explicar procedimentos de reparo passo a passo de forma clara
- Alertar sobre precauções de segurança (descarregar capacitores, alta tensão, etc.)
- Recomendar ferramentas e equipamentos necessários para cada tipo de reparo

ANÁLISES E GESTÃO DA LOJA:
- Ajudar na análise de custos de reparo vs substituição
- Auxiliar no controle de estoque de peças e componentes
- Fornecer insights sobre serviços mais rentáveis
- Sugerir melhorias nos processos de atendimento
- Ajudar na precificação de serviços

Sempre use linguagem técnica apropriada, mas explique termos complexos quando necessário. Seja direto, prático e focado em soluções viáveis.`;

export const sendMessageToAI = async (message, history = []) => {
  try {
    // Inicia com a mensagem de sistema
    const messages = [
      { role: 'system', content: SYSTEM_CONTEXT }
    ];

    // Adiciona o histórico da conversa
    const historyMessages = history.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'assistant',
      content: msg.text
    }));

    messages.push(...historyMessages);

    // Adiciona a nova mensagem do usuário
    messages.push({ role: 'user', content: message });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // Opcional, para rankings no openrouter.ai
        'X-Title': 'Tecnilaser Assistant', // Opcional
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: messages,
        temperature: 0.7, // Controla a criatividade (0.0 = mais focado, 1.0 = mais criativo)
        max_tokens: 1000 // Limite de tokens na resposta
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Falha ao obter resposta da IA');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao chamar API da IA:', error);
    throw error;
  }
};

// Helper to fetch database snapshot for AI insights
export const fetchDatabaseForAI = async () => {
  try {
    const snapshot = await getDatabaseSnapshot();
    return snapshot;
  } catch (error) {
    console.error('Error fetching database snapshot for AI:', error);
    throw error;
  }
};