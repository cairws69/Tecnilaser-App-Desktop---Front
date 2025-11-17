import React from 'react';
import { ArrowLeft, User, Phone, MapPin, Wrench, Calendar, FileText, CheckCircle, XCircle, Printer } from 'lucide-react';

const DeviceDetails = ({ device, onBack }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Detalhes do Aparelho</h2>
            <p className="text-gray-400">Informações completas sobre o aparelho {device.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            <Printer className="w-5 h-5" />
            Imprimir
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-4 mb-8">
        <span className={`px-4 py-2 rounded-lg text-sm font-medium ${getStatusColor(device.status)}`}>
          Status: {device.status}
        </span>
        <span className={`px-4 py-2 rounded-lg text-sm font-medium ${device.accepted === 'sim' ? 'bg-green-600' : 'bg-red-600'}`}>
          {device.accepted === 'sim' ? (
            <>
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Orçamento Aceito
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 inline mr-2" />
              Orçamento Não Aceito
            </>
          )}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Client Information */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-teal-600 rounded-lg">
              <User className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Informações do Cliente</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">ID do Cliente</label>
              <p className="text-white font-medium">{device.clientId}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Nome</label>
              <p className="text-white font-medium">{device.clientName}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                <Phone className="w-4 h-4 inline mr-2" />
                Telefone
              </label>
              <p className="text-white font-medium">{device.clientPhone}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                <MapPin className="w-4 h-4 inline mr-2" />
                Endereço
              </label>
              <p className="text-white font-medium">{device.clientAddress || '-'}</p>
              {device.clientNeighborhood && (
                <p className="text-gray-400 text-sm mt-1">Bairro: {device.clientNeighborhood}</p>
              )}
            </div>
          </div>
        </div>

        {/* Device Information */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-600 rounded-lg">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Informações do Aparelho</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">ID do Aparelho</label>
              <p className="text-white font-medium">{device.id}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Aparelho</label>
              <p className="text-white font-medium">{device.device}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Modelo</label>
              <p className="text-white font-medium">{device.model || '-'}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Voltagem</label>
              <p className="text-white font-medium">{device.voltage}V</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Baixado</label>
              <p className="text-white font-medium">{device.downloaded ? 'Sim' : 'Não'}</p>
            </div>
          </div>
        </div>

        {/* Defect and Repair */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-red-600 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Defeito e Reparo</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Defeito Relatado</label>
              <p className="text-white font-medium">{device.defect}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Conserto Realizado</label>
              <p className="text-white font-medium">{device.repair || 'Aguardando diagnóstico'}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Orçamento</label>
              <p className="text-white font-medium text-xl">
                {device.budget ? `R$ ${device.budget}` : 'Não definido'}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-600 rounded-lg">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Timeline</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Data de Entrada</label>
              <p className="text-white font-medium">{formatDate(device.entryDate)}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Data Prometida</label>
              <p className="text-white font-medium">{formatDate(device.promisedDate) || 'Não definida'}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Data de Conclusão</label>
              <p className="text-white font-medium">{formatDate(device.completionDate) || 'Não concluído'}</p>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Data de Saída</label>
              <p className="text-white font-medium">{formatDate(device.exitDate) || 'Não retirado'}</p>
            </div>
          </div>
        </div>

        {/* Observations */}
        {device.observation && (
          <div className="bg-gray-800 rounded-lg p-6 col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Observações</h3>
            <p className="text-gray-300 leading-relaxed">{device.observation}</p>
          </div>
        )}

        {/* Warranty */}
        {device.warranty && (
          <div className="bg-gray-800 rounded-lg p-6 col-span-2">
            <h3 className="text-xl font-bold text-white mb-4">Garantia</h3>
            <p className="text-gray-300 leading-relaxed">{device.warranty}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceDetails;