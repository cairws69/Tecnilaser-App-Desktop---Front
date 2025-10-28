import React from 'react';
import { Users, Laptop } from 'lucide-react';

const Sidebar = ({ activeScreen, setActiveScreen, setAiSidebarOpen }) => {
  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Tecnilaser</h1>
            <p className="text-sm text-gray-400">Sistema de Gestão</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <button
          onClick={() => setActiveScreen('clients')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeScreen === 'clients' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-750'
          }`}
        >
          <Users className="w-5 h-5" />
          <span>Cadastro de Clientes</span>
        </button>

        <button
          onClick={() => setActiveScreen('devices')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
            activeScreen === 'devices' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-750'
          }`}
        >
          <Laptop className="w-5 h-5" />
          <span>Gestão de Aparelhos</span>
        </button>
      </nav>

      <button
        onClick={() => setAiSidebarOpen(true)}
        className="m-4 flex items-center gap-3 px-4 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 transition-colors"
      >
        <Laptop className="w-5 h-5" />
        <span>Assistente IA</span>
      </button>
    </div>
  );
};

export default Sidebar;