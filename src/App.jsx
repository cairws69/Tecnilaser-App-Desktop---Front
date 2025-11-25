// src/App.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ClientRegistration from './components/ClientRegistration';
import DeviceManagement from './components/DeviceManagement';
import DeviceStatus from './components/DeviceStatus';
import DeviceDetails from './components/DeviceDetails';
import AISidebar from './components/AISidebar';
import api from './services/api';
import { sendMessageToAI, fetchDatabaseForAI } from './services/aiService';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('clients');
  const [aiSidebarOpen, setAiSidebarOpen] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [aiMessages, setAiMessages] = useState([]);
  const [selectedDeviceForDetails, setSelectedDeviceForDetails] = useState(null);
  const [clients, setClients] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClientForDevice, setSelectedClientForDevice] = useState(null);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [clientsData, devicesData] = await Promise.all([
        api.getAllClients(),
        api.getAllDevices()
      ]);
      setClients(clientsData);
      setDevices(devicesData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Erro ao carregar dados. Verifique se o servidor está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateServiceOrder = (client) => {
    setSelectedClientForDevice(client);
    setActiveScreen('devices');
  };

  const handleAddClient = async (newClient) => {
    try {
      const createdClient = await api.createClient(newClient);
      setClients(prev => [...prev, createdClient]);
      alert('Cliente cadastrado com sucesso!');
    } catch (error) {
      console.error('Error adding client:', error);
      alert('Erro ao cadastrar cliente.');
    }
  };

  const handleAddDevice = async (newDevice) => {
    try {
      const createdDevice = await api.createDevice(newDevice);
      setDevices(prev => [...prev, createdDevice]);
      setSelectedClientForDevice(null);
      alert('Aparelho cadastrado com sucesso!');
    } catch (error) {
      console.error('Error adding device:', error);
      alert('Erro ao cadastrar aparelho.');
    }
  };

  const handleToggleDownloaded = async (deviceId) => {
    try {
      const updatedDevice = await api.toggleDeviceDownloaded(deviceId);
      setDevices(prev =>
        prev.map(device =>
          device.id === deviceId ? updatedDevice : device
        )
      );
    } catch (error) {
      console.error('Error toggling device:', error);
      alert('Erro ao atualizar status do aparelho.');
    }
  };

  const handleViewDetails = (device) => {
    setSelectedDeviceForDetails(device);
    setActiveScreen('deviceDetails');
  };

  const handleBackFromDetails = () => {
    setSelectedDeviceForDetails(null);
    setActiveScreen('status');
  };

  const handleSendMessage = async () => {
    if (aiMessage.trim()) {
      const userMsg = { type: 'user', text: aiMessage };
      setAiMessages(prev => [...prev, userMsg]);
      setAiMessage('');
      try {
        // Get a snapshot of the database for context
        const dbSnapshot = await fetchDatabaseForAI();
        const context = `Database snapshot:\n${JSON.stringify(dbSnapshot, null, 2)}`;
        const combinedMessage = `${context}\n\nUser: ${userMsg.text}`;
        const response = await sendMessageToAI(combinedMessage, aiMessages);
        setAiMessages(prev => [...prev, { type: 'ai', text: response }]);
      } catch (error) {
        console.error(error);
        setAiMessages(prev => [...prev, { type: 'ai', text: 'Desculpe, ocorreu um erro ao processar sua mensagem.' }]);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900 text-gray-100 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <Sidebar
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        setAiSidebarOpen={setAiSidebarOpen}
      />

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

        {activeScreen === 'status' && (
          <DeviceStatus
            devices={devices}
            clients={clients}
            onViewDetails={handleViewDetails}
          />
        )}

        {activeScreen === 'deviceDetails' && selectedDeviceForDetails && (
          <DeviceDetails
            device={selectedDeviceForDetails}
            onBack={handleBackFromDetails}
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