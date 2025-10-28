import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ClientRegistration from './components/ClientRegistration';
import DeviceManagement from './components/DeviceManagement';
import AISidebar from './components/AISidebar';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('clients');
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiMessages, setAiMessages] = useState([]);
  
  const [clients, setClients] = useState([
    { 
      id: 'CLI-001', 
      name: 'João Silva', 
      phone: '(19) 98765-4321', 
      email: 'joao@email.com', 
      registrationDate: '2025-01-15',
      dateOfBirth: '1990-05-15',
      rg: '12.345.678-9',
      postalCode: '13330-250',
      address: 'Rua das Flores, 123',
      neighborhood: 'Centro',
      city: 'Indaiatuba',
      state: 'SP'
    }
  ]);

  const [devices, setDevices] = useState([
    { 
      id: 'DEV-001', 
      downloaded: false, 
      clientName: 'João Silva', 
      phone: '(19) 98765-4321', 
      device: 'TV Samsung 55"', 
      defect: 'Sem imagem',
      clientId: 'CLI-001'
    }
  ]);

  const [selectedClientForDevice, setSelectedClientForDevice] = useState(null);

  const handleGenerateServiceOrder = (client) => {
    setSelectedClientForDevice(client);
    setActiveScreen('devices');
  };

  const handleAddClient = (newClient) => {
    setClients(prev => [...prev, { ...newClient, id: `CLI-${String(prev.length + 1).padStart(3, '0')}` }]);
  };

  const handleAddDevice = (newDevice) => {
    setDevices(prev => [...prev, { ...newDevice, id: `DEV-${String(prev.length + 1).padStart(3, '0')}` }]);
    setSelectedClientForDevice(null);
  };

  const handleToggleDownloaded = (deviceId) => {
    setDevices(prev => prev.map(device => 
      device.id === deviceId ? { ...device, downloaded: !device.downloaded } : device
    ));
  };

  const handleSendMessage = () => {
    if (aiMessage.trim()) {
      setAiMessages(prev => [...prev, { type: 'user', text: aiMessage }]);
      setTimeout(() => {
        setAiMessages(prev => [...prev, { 
          type: 'ai', 
          text: 'Posso ajudá-lo a validar dados ou sugerir informações. Quando o backend estiver conectado, poderei analisar seu banco de dados e identificar problemas recorrentes.' 
        }]);
      }, 500);
      setAiMessage('');
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} setAiSidebarOpen={setAiSidebarOpen} />

      <div className="flex-1 overflow-auto">
        {activeScreen === 'clients' && (
          <ClientRegistration 
            clients={clients} 
            onAddClient={handleAddClient}
            onGenerateServiceOrder={handleGenerateServiceOrder}
          />
        )}

        {activeScreen === 'devices' && (
          <DeviceManagement 
            clients={clients}
            devices={devices}
            onAddDevice={handleAddDevice}
            onToggleDownloaded={handleToggleDownloaded}
            selectedClient={selectedClientForDevice}
          />
        )}
      </div>

      <AISidebar
        isOpen={aiSidebarOpen}
        onClose={() => setAiSidebarOpen(false)}
        messages={aiMessages}
        message={aiMessage}
        setMessage={setAiMessage}
        onSendMessage={handleSendMessage}
      />

      {!aiSidebarOpen && (
        <button
          onClick={() => setAiSidebarOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-teal-600 hover:bg-teal-700 rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;