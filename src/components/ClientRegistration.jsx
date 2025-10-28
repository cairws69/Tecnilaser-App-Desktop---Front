import React, { useState } from 'react';

const ClientRegistration = ({ clients, onAddClient, onGenerateServiceOrder }) => {
  const [clientForm, setClientForm] = useState({
    id: 'Auto-gerado',
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    rg: '',
    postalCode: '',
    address: '',
    neighborhood: '',
    city: '',
    state: '',
    registrationDate: new Date().toISOString().split('T')[0]
  });

  const handleInputChange = (field, value) => {
    setClientForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClient = () => {
    if (clientForm.name && clientForm.email && clientForm.phone) {
      onAddClient(clientForm);
      // Reset form
      setClientForm({
        id: 'Auto-gerado',
        name: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        rg: '',
        postalCode: '',
        address: '',
        neighborhood: '',
        city: '',
        state: '',
        registrationDate: new Date().toISOString().split('T')[0]
      });
    } else {
      alert('Por favor, preencha os campos Nome, Email e Telefone');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Cadastro de Clientes</h2>
          <p className="text-gray-400">Insira os dados abaixo para adicionar um novo cliente.</p>
        </div>
        <button 
          onClick={handleSaveClient}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Salvar Cliente
        </button>
      </div>

      {/* Client Form */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm text-gray-300 mb-2">ID do Cliente</label>
          <input
            type="text"
            value={clientForm.id}
            disabled
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm text-gray-300 mb-2">Nome Completo</label>
          <input
            type="text"
            value={clientForm.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Digite o nome completo do cliente"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={clientForm.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="cliente@exemplo.com"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Telefone</label>
          <input
            type="tel"
            value={clientForm.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="(XX) XXXXX-XXXX"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Data de Nascimento</label>
          <input
            type="date"
            value={clientForm.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">RG</label>
          <input
            type="text"
            value={clientForm.rg}
            onChange={(e) => handleInputChange('rg', e.target.value)}
            placeholder="XX.XXX.XXX-X"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">CEP</label>
          <input
            type="text"
            value={clientForm.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            placeholder="XXXXX-XXX"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm text-gray-300 mb-2">Endereço</label>
          <input
            type="text"
            value={clientForm.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Digite o nome da rua e número"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Bairro</label>
          <input
            type="text"
            value={clientForm.neighborhood}
            onChange={(e) => handleInputChange('neighborhood', e.target.value)}
            placeholder="Digite o bairro"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Cidade</label>
          <input
            type="text"
            value={clientForm.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder="Digite a cidade"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Estado</label>
          <input
            type="text"
            value={clientForm.state}
            onChange={(e) => handleInputChange('state', e.target.value)}
            placeholder="Digite o estado"
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-teal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Registered Clients Table */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">Clientes Cadastrados</h3>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-750">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Nome</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Telefone</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Data de Cadastro</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, idx) => (
              <tr key={idx} className="border-t border-gray-700">
                <td className="px-6 py-4 text-sm">{client.id}</td>
                <td className="px-6 py-4 text-sm">{client.name}</td>
                <td className="px-6 py-4 text-sm">{client.phone}</td>
                <td className="px-6 py-4 text-sm">{client.email}</td>
                <td className="px-6 py-4 text-sm">{client.registrationDate}</td>
                <td className="px-6 py-4 text-sm">
                  <button 
                    onClick={() => onGenerateServiceOrder(client)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                  >
                    Gerar Ordem de Serviço
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientRegistration;