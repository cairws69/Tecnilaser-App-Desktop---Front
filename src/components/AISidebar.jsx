import React from 'react';
import { Laptop, ChevronRight, Send } from 'lucide-react';

const AISidebar = ({ isOpen, onClose, messages, message, setMessage, onSendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
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
            Como posso ajudá-lo? Peça para validar dados ou sugerir informações.
          </p>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p className="text-sm">Nenhuma mensagem ainda.</p>
              <p className="text-xs mt-2">Inicie uma conversa com a IA!</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg ${
                  msg.type === 'user' 
                    ? 'bg-teal-600 ml-8' 
                    : 'bg-gray-700 mr-8'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-gray-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pergunte à IA..."
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-teal-500 focus:outline-none text-white placeholder-gray-400"
            />
            <button
              onClick={onSendMessage}
              className="p-3 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISidebar;