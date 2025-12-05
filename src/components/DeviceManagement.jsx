import React, { useState, useEffect } from 'react';
import { Printer, Download } from 'lucide-react';

const DeviceManagement = ({ clients, devices, onAddDevice, onToggleDownloaded, selectedClient }) => {
  const [deviceForm, setDeviceForm] = useState({
    id: 'Auto-gerado',
    clientId: '',
    clientName: '',
    clientAddress: '',
    clientNeighborhood: '',
    clientPhone: '',
    device: '',
    model: '',
    defect: '',
    voltage: '110',
    repair: '',
    budget: '',
    entryDate: new Date().toISOString().split('T')[0],
    promisedDate: '',
    observation: '',
    accepted: 'não',
    completionDate: '',
    exitDate: '',
    status: 'Aguardando',
    warranty: ''
  });

  // Auto-fill form when selectedClient changes (from Generate Service Order)
  useEffect(() => {
    if (selectedClient) {
      setDeviceForm(prev => ({
        ...prev,
        clientId: selectedClient.id,
        clientName: selectedClient.name,
        clientPhone: selectedClient.phone,
        clientAddress: selectedClient.address,
        clientNeighborhood: selectedClient.neighborhood
      }));
    }
  }, [selectedClient]);

  const handleInputChange = (field, value) => {
    setDeviceForm(prev => ({ ...prev, [field]: value }));
  };

  const handleClientSelect = (clientId) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setDeviceForm(prev => ({
        ...prev,
        clientId: client.id,
        clientName: client.name,
        clientPhone: client.phone,
        clientAddress: client.address,
        clientNeighborhood: client.neighborhood
      }));
    }
  };

  const handleSaveDevice = () => {
    if (deviceForm.clientId && deviceForm.device && deviceForm.defect) {
      // Remove o campo 'id' antes de enviar para o banco
      const { id, ...deviceData } = deviceForm;
      onAddDevice(deviceData);
      // Reset form
      setDeviceForm({
        id: 'Auto-gerado',
        clientId: '',
        clientName: '',
        clientAddress: '',
        clientNeighborhood: '',
        clientPhone: '',
        device: '',
        model: '',
        defect: '',
        voltage: '110',
        repair: '',
        budget: '',
        entryDate: new Date().toISOString().split('T')[0],
        promisedDate: '',
        observation: '',
        accepted: 'não',
        completionDate: '',
        exitDate: '',
        status: 'Aguardando',
        warranty: ''
      });
    } else {
      alert('Por favor, preencha os campos Cliente, Aparelho e Defeito');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Gestão de Aparelhos</h2>
          <p className="text-gray-400">Registre e gerencie os reparos de aparelhos.</p>
        </div>
        <button 
          onClick={handleSaveDevice}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Salvar Aparelho
        </button>
      </div>

      {/* Device Form */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm text-gray-300 mb-2">ID do Aparelho</label>
          <input
            type="text"
            value={deviceForm.id}
            disabled
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm text-gray-300 mb-2">Selecionar Cliente</label>
          <select
            value={deviceForm.clientId}
            onChange={(e) => handleClientSelect(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          >
            <option value="">Escolha um cliente...</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name} - {client.phone}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Nome do Cliente</label>
          <input
            type="text"
            value={deviceForm.clientName}
            disabled
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Telefone</label>
          <input
            type="text"
            value={deviceForm.clientPhone}
            disabled
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Endereço</label>
          <input
            type="text"
            value={deviceForm.clientAddress}
            disabled
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Aparelho</label>
          <input
            type="text"
            value={deviceForm.device}
            onChange={(e) => handleInputChange('device', e.target.value)}
            placeholder="Ex: TV Samsung 55"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Modelo</label>
          <input
            type="text"
            value={deviceForm.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            placeholder="Número do modelo"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Voltagem</label>
          <select
            value={deviceForm.voltage}
            onChange={(e) => handleInputChange('voltage', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          >
            <option value="110">110V</option>
            <option value="220">220V</option>
          </select>
        </div>

        <div className="col-span-3">
          <label className="block text-sm text-gray-300 mb-2">Defeito</label>
          <input
            type="text"
            value={deviceForm.defect}
            onChange={(e) => handleInputChange('defect', e.target.value)}
            placeholder="Descreva o problema"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Conserto</label>
          <input
            type="text"
            value={deviceForm.repair}
            onChange={(e) => handleInputChange('repair', e.target.value)}
            placeholder="Descrição do conserto"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Orçamento (R$)</label>
          <input
            type="text"
            value={deviceForm.budget}
            onChange={(e) => handleInputChange('budget', e.target.value)}
            placeholder="0,00"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Situação</label>
          <select
            value={deviceForm.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          >
            <option value="Aguardando">Aguardando</option>
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Entregue">Entregue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Data de Entrada</label>
          <input
            type="date"
            value={deviceForm.entryDate}
            onChange={(e) => handleInputChange('entryDate', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Data Prometida</label>
          <input
            type="date"
            value={deviceForm.promisedDate}
            onChange={(e) => handleInputChange('promisedDate', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Aceito?</label>
          <select
            value={deviceForm.accepted}
            onChange={(e) => handleInputChange('accepted', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          >
            <option value="não">Não</option>
            <option value="sim">Sim</option>
          </select>
        </div>

        <div className="col-span-3">
          <label className="block text-sm text-gray-300 mb-2">Observação</label>
          <textarea
            value={deviceForm.observation}
            onChange={(e) => handleInputChange('observation', e.target.value)}
            placeholder="Notas adicionais..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
          />
        </div>

        <div className="col-span-3">
          <label className="block text-sm text-gray-300 mb-2">Descrição da Garantia</label>
          <textarea
            value={deviceForm.warranty}
            onChange={(e) => handleInputChange('warranty', e.target.value)}
            placeholder="Termos e condições da garantia..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
          <Download className="w-5 h-5" />
          Baixar
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          <Printer className="w-5 h-5" />
          Imprimir Ordem de Serviço
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
          <Printer className="w-5 h-5" />
          Imprimir Saída do Aparelho
        </button>
      </div>

      {/* Devices Table */}
      <h3 className="text-2xl font-bold text-white mb-6">Aparelhos Cadastrados</h3>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Baixado</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Nome do Cliente</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Telefone</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Aparelho</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Defeito</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, idx) => (
              <tr key={idx} className="border-t border-gray-700">
                <td className="px-6 py-4 text-sm">{device.id}</td>
                <td className="px-6 py-4 text-sm">
                  <input 
                    type="checkbox" 
                    checked={device.downloaded} 
                    onChange={() => onToggleDownloaded(device.id)}
                    className="w-4 h-4 cursor-pointer accent-teal-600" 
                  />
                </td>
                <td className="px-6 py-4 text-sm">{device.clientName}</td>
                <td className="px-6 py-4 text-sm">{device.phone}</td>
                <td className="px-6 py-4 text-sm">{device.device}</td>
                <td className="px-6 py-4 text-sm">{device.defect}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeviceManagement;