import React, { useState } from "react";

export default function DeviceManagement({ clients, onAddDevice }) {
  const [deviceForm, setDeviceForm] = useState({
    id: "Auto-gerado",
    clientId: "",
    clientName: "",
    clientAddress: "",
    clientNeighborhood: "",
    clientPhone: "",
    device: "",
    model: "",
    defect: "",
    voltage: "110",
    repair: "",
    budget: "",
    entryDate: new Date().toISOString().split("T")[0],
    promisedDate: "",
    observation: "",
    accepted: "não",
    completionDate: "",
    exitDate: "",
    status: "Aguardando",
    warranty: ""
  });

  const handleSelectClient = (clientId) => {
    const client = clients.find((c) => c.id === clientId);

    setDeviceForm((prev) => ({
      ...prev,
      clientId,
      clientName: client?.name || "",
      clientAddress: client?.address || "",
      clientNeighborhood: client?.neighborhood || "",
      clientPhone: client?.phone || ""
    }));
  };

  const handleSaveDevice = () => {
    if (!deviceForm.clientId || !deviceForm.device || !deviceForm.defect) {
      alert("Por favor, preencha os campos Cliente, Aparelho e Defeito");
      return;
    }

    // ❗ Remove campos que NÃO devem ir para sua API
    const {
      id,
      clientName,
      clientAddress,
      clientNeighborhood,
      clientPhone,
      ...dataToSend
    } = deviceForm;

    onAddDevice(dataToSend); // envia sem id

    // Reset mantendo o placeholder do ID
    setDeviceForm({
      id: "Auto-gerado",
      clientId: "",
      clientName: "",
      clientAddress: "",
      clientNeighborhood: "",
      clientPhone: "",
      device: "",
      model: "",
      defect: "",
      voltage: "110",
      repair: "",
      budget: "",
      entryDate: new Date().toISOString().split("T")[0],
      promisedDate: "",
      observation: "",
      accepted: "não",
      completionDate: "",
      exitDate: "",
      status: "Aguardando",
      warranty: ""
    });
  };

  return (
    <div className="device-management">
      <h2>Cadastrar Aparelho</h2>

      <div>
        <label>ID</label>
        <input value={deviceForm.id} disabled />
      </div>

      <div>
        <label>Cliente</label>
        <select
          value={deviceForm.clientId}
          onChange={(e) => handleSelectClient(e.target.value)}
        >
          <option value="">Selecione...</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Aparelho</label>
        <input
          value={deviceForm.device}
          onChange={(e) =>
            setDeviceForm((prev) => ({ ...prev, device: e.target.value }))
          }
        />
      </div>

      <div>
        <label>Modelo</label>
        <input
          value={deviceForm.model}
          onChange={(e) =>
            setDeviceForm((prev) => ({ ...prev, model: e.target.value }))
          }
        />
      </div>

      <div>
        <label>Defeito</label>
        <input
          value={deviceForm.defect}
          onChange={(e) =>
            setDeviceForm((prev) => ({ ...prev, defect: e.target.value }))
          }
        />
      </div>

      <div>
        <label>Tensão</label>
        <select
          value={deviceForm.voltage}
          onChange={(e) =>
            setDeviceForm((prev) => ({ ...prev, voltage: e.target.value }))
          }
        >
          <option value="110">110V</option>
          <option value="220">220V</option>
        </select>
      </div>

      <div>
        <label>Observações</label>
        <textarea
          value={deviceForm.observation}
          onChange={(e) =>
            setDeviceForm((prev) => ({ ...prev, observation: e.target.value }))
          }
        />
      </div>

      <button onClick={handleSaveDevice}>Salvar</button>
    </div>
  );
}
