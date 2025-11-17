import React, { useState } from 'react';
import { Search, Eye, Calendar, Clock } from 'lucide-react';

const DeviceStatus = ({ devices, clients, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchField, setSearchField] = useState('all');
  const [filteredDevices, setFilteredDevices] = useState(devices);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredDevices(devices);
      return;
    }

    const filtered = devices.filter(device => {
      const searchLower = searchTerm.toLowerCase();
      
      switch(searchField) {
        case 'id':
          return device.id.toLowerCase().includes(searchLower);
        case 'clientName':
          return device.clientName.toLowerCase().includes(searchLower);
        case 'model':
          return device.model?.toLowerCase().includes(searchLower);
        case 'device':
          return device.device.toLowerCase().includes(searchLower);
        case 'all':
        default:
          return (
            device.id.toLowerCase().includes(searchLower) ||
            device.clientName.toLowerCase().includes(searchLower) ||
            device.model?.toLowerCase().includes(searchLower) ||
            device.device.toLowerCase().includes(searchLower)
          );
      }
    });

    setFilteredDevices(filtered);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Aguardando': 'bg-yellow-600',
      'Em Andamento': 'bg-blue-600',
      'Concluído': 'bg-green-600',
      'Entregue': 'bg-gray-600'
    };
    return colors[status] || 'bg-gray-600';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Status dos Aparelhos</h2>
        <p className="text-gray-400">Pesquise e acompanhe o status dos aparelhos cadastrados.</p>
      </div>

      {/* Search Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <label className="block text-sm text-gray-300 mb-2">Pesquisar por</label>
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-teal-500 focus:outline-none"
            >
              <option value="all">Todos os campos</option>
              <option value="id">ID do Aparelho</option>
              <option value="clientName">Nome do Cliente</option>
              <option value="device">Aparelho</option>
              <option value="model">Modelo</option>
            </select>
          </div>

          <div className="col-span-7">
            <label className="block text-sm text-gray-300 mb-2">Termo de busca</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite para pesquisar..."
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="col-span-2 flex items-end">
            <button
              onClick={handleSearch}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5" />
              Pesquisar
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">
          Resultados da Pesquisa
          <span className="text-lg text-gray-400 ml-3">
            ({filteredDevices.length} {filteredDevices.length === 1 ? 'aparelho encontrado' : 'aparelhos encontrados'})
          </span>
        </h3>
      </div>

      {/* Results Table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Cliente</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Aparelho</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Modelo</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Data de Entrada</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Nenhum aparelho encontrado com os critérios de pesquisa.</p>
                </td>
              </tr>
            ) : (
              filteredDevices.map((device, idx) => (
                <tr key={idx} className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-teal-400">{device.id}</td>
                  <td className="px-6 py-4 text-sm">{device.clientName}</td>
                  <td className="px-6 py-4 text-sm">{device.device}</td>
                  <td className="px-6 py-4 text-sm">{device.model || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      {formatDate(device.entryDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => onViewDetails(device)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Ver Detalhes
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mt-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm text-gray-400">Aguardando</h4>
            <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
          </div>
          <p className="text-2xl font-bold text-white">
            {devices.filter(d => d.status === 'Aguardando').length}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm text-gray-400">Em Andamento</h4>
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          </div>
          <p className="text-2xl font-bold text-white">
            {devices.filter(d => d.status === 'Em Andamento').length}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm text-gray-400">Concluído</h4>
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
          </div>
          <p className="text-2xl font-bold text-white">
            {devices.filter(d => d.status === 'Concluído').length}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm text-gray-400">Entregue</h4>
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
          </div>
          <p className="text-2xl font-bold text-white">
            {devices.filter(d => d.status === 'Entregue').length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceStatus;