import React, { useState, useEffect, useRef } from 'react';
import { Laptop, ChevronRight, Send, Loader2 } from 'lucide-react';
import chatService from '../services/chatService';

const AISidebar = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    
    // Limpa o input IMEDIATAMENTE
    setMessage('');
    
    // Adiciona mensagem do usuário
    const newUserMessage = { 
      type: 'user', 
      text: userMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      console.log('🚀 Enviando mensagem:', userMessage);
      
      // Envia para a API e recebe resposta
      const response = await chatService.sendMessage(userMessage);
      
      console.log('📥 Resposta completa recebida:', response);
      console.log('📥 Tipo da resposta:', typeof response);
      
      // Extrai o texto da resposta de forma mais robusta
      let responseText = '';
      
      // Se a resposta for uma string
      if (typeof response === 'string') {
        responseText = response;
        console.log('✅ Resposta é string:', responseText);
      } 
      // Se for um objeto
      else if (response && typeof response === 'object') {
        // Tenta várias propriedades possíveis
        if (response.message) {
          responseText = response.message;
          console.log('✅ Encontrado response.message:', responseText);
        } else if (response.response) {
          responseText = response.response;
          console.log('✅ Encontrado response.response:', responseText);
        } else if (response.text) {
          responseText = response.text;
          console.log('✅ Encontrado response.text:', responseText);
        } else if (response.content) {
          responseText = response.content;
          console.log('✅ Encontrado response.content:', responseText);
        } else if (response.data) {
          // Se houver um objeto data aninhado
          if (typeof response.data === 'string') {
            responseText = response.data;
          } else if (response.data.message) {
            responseText = response.data.message;
          } else {
            responseText = JSON.stringify(response.data, null, 2);
          }
          console.log('✅ Encontrado response.data:', responseText);
        } else {
          // Fallback: converte o objeto todo para JSON
          responseText = JSON.stringify(response, null, 2);
          console.log('⚠️ Usando JSON.stringify como fallback');
        }
      } else {
        responseText = 'Resposta recebida mas em formato não reconhecido';
        console.log('❌ Formato de resposta não reconhecido:', response);
      }
      
      // Verifica se conseguimos extrair algum texto
      if (!responseText || responseText.trim() === '') {
        responseText = 'Resposta vazia recebida do servidor';
        console.log('⚠️ Texto da resposta está vazio');
      }
      
      // Adiciona resposta da IA
      const aiMessage = { 
        type: 'ai', 
        text: responseText,
        timestamp: new Date().toISOString()
      };
      
      console.log('💬 Adicionando mensagem da IA:', aiMessage);
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('❌ Erro completo:', error);
      console.error('❌ Stack trace:', error.stack);
      
      // Mensagem de erro mais detalhada
      let errorMessage = 'Desculpe, ocorreu um erro ao processar sua mensagem.\n\n';
      
      if (error.message.includes('fetch') || error.message.includes('network')) {
        errorMessage += '🔌 Erro de conexão: Verifique se o servidor webhook está rodando em http://localhost:8080';
      } else if (error.message.includes('500')) {
        errorMessage += '⚠️ Erro no servidor (HTTP 500): O webhook teve um problema interno. Verifique os logs do servidor.';
      } else if (error.message.includes('404')) {
        errorMessage += '🔍 Endpoint não encontrado (HTTP 404): Verifique se a URL do webhook está correta.';
      } else {
        errorMessage += `❌ Erro: ${error.message}`;
      }
      
      // Em caso de erro, mostra mensagem de erro
      const errorMsg = { 
        type: 'ai', 
        text: errorMessage,
        timestamp: new Date().toISOString(),
        error: true
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-gray-800 border-l border-gray-700 transition-all duration-300 ease-in-out ${
        isOpen ? 'w-96' : 'w-0'
      } overflow-hidden z-50`}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Assistente IA</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 bg-gray-750 border-b border-gray-700">
          <p className="text-sm text-gray-300">
            Como posso ajudá-lo? Pergunte sobre clientes, aparelhos ou qualquer informação do sistema.
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <Laptop className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Nenhuma mensagem ainda.</p>
              <p className="text-xs mt-2">Inicie uma conversa com a IA!</p>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-teal-600 ml-8' 
                      : msg.error
                      ? 'bg-red-600 mr-8'
                      : 'bg-gray-700 mr-8'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-400 mr-8">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Processando...</span>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-700">
          <div className="flex gap-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pergunte à IA..."
              disabled={isLoading}
              rows={2}
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-teal-500 focus:outline-none text-white placeholder-gray-400 resize-none disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !message.trim()}
              className="p-3 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Pressione Enter para enviar, Shift+Enter para nova linha
          </p>
        </div>
      </div>
    </div>
  );
};

export default AISidebar;