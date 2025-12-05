// src/services/chatService.js
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL;

class ChatService {
  async sendMessage(message) {
    try {
      console.log('📤 Enviando para:', CHAT_API_URL);
      console.log('📝 Mensagem:', message);
      
      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          text: message,  // ⬅️ AQUI É text, não message!
          timestamp: new Date().toISOString()
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Erro ao fazer parse JSON:', e);
        throw new Error('Resposta inválida do servidor');
      }

      if (!response.ok) {
        throw new Error(data?.message || 'Erro no servidor');
      }

      // Retorna a resposta do webhook
      return data.response || data.message || JSON.stringify(data);
      
    } catch (error) {
      console.error('❌ Erro no chatService:', error);
      
      if (error.message.includes('Failed to fetch') || error.name === 'TypeError') {
        throw new Error('Não foi possível conectar ao servidor. Verifique se o webhook está rodando.');
      }
      
      throw error;
    }
  }
}

export default new ChatService();