// src/services/api.js
const API_URL = 'http://localhost:3000/api';

class ApiService {
  // ============= CLIENT METHODS =============
  
  async getAllClients() {
    try {
      const response = await fetch(`${API_URL}/clients`);
      if (!response.ok) throw new Error('Failed to fetch clients');
      return await response.json();
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  }

  async getClientById(id) {
    try {
      const response = await fetch(`${API_URL}/clients/${id}`);
      if (!response.ok) throw new Error('Failed to fetch client');
      return await response.json();
    } catch (error) {
      console.error('Error fetching client:', error);
      throw error;
    }
  }

  async createClient(clientData) {
    try {
      const response = await fetch(`${API_URL}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) throw new Error('Failed to create client');
      return await response.json();
    } catch (error) {
      console.error('Error creating client:', error);
      throw error;
    }
  }

  async updateClient(id, clientData) {
    try {
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      });
      if (!response.ok) throw new Error('Failed to update client');
      return await response.json();
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  }

  async deleteClient(id) {
    try {
      const response = await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete client');
      return await response.json();
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  }

  // ============= DEVICE METHODS =============

  async getAllDevices() {
    try {
      const response = await fetch(`${API_URL}/devices`);
      if (!response.ok) throw new Error('Failed to fetch devices');
      return await response.json();
    } catch (error) {
      console.error('Error fetching devices:', error);
      throw error;
    }
  }

  async getDeviceById(id) {
    try {
      const response = await fetch(`${API_URL}/devices/${id}`);
      if (!response.ok) throw new Error('Failed to fetch device');
      return await response.json();
    } catch (error) {
      console.error('Error fetching device:', error);
      throw error;
    }
  }

  async getDevicesByClientId(clientId) {
    try {
      const response = await fetch(`${API_URL}/clients/${clientId}/devices`);
      if (!response.ok) throw new Error('Failed to fetch client devices');
      return await response.json();
    } catch (error) {
      console.error('Error fetching client devices:', error);
      throw error;
    }
  }

  async createDevice(deviceData) {
    try {
      const response = await fetch(`${API_URL}/devices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceData),
      });
      if (!response.ok) throw new Error('Failed to create device');
      return await response.json();
    } catch (error) {
      console.error('Error creating device:', error);
      throw error;
    }
  }

  async updateDevice(id, deviceData) {
    try {
      const response = await fetch(`${API_URL}/devices/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deviceData),
      });
      if (!response.ok) throw new Error('Failed to update device');
      return await response.json();
    } catch (error) {
      console.error('Error updating device:', error);
      throw error;
    }
  }

  async toggleDeviceDownloaded(id) {
    try {
      const response = await fetch(`${API_URL}/devices/${id}/toggle-downloaded`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Failed to toggle device downloaded');
      return await response.json();
    } catch (error) {
      console.error('Error toggling device downloaded:', error);
      throw error;
    }
  }

  async deleteDevice(id) {
    try {
      const response = await fetch(`${API_URL}/devices/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete device');
      return await response.json();
    } catch (error) {
      console.error('Error deleting device:', error);
      throw error;
    }
  }

  // ============= STATISTICS METHODS =============

  async getStatistics() {
    try {
      const response = await fetch(`${API_URL}/statistics`);
      if (!response.ok) throw new Error('Failed to fetch statistics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }

  // ============= HEALTH CHECK =============

  async checkHealth() {
    try {
      const response = await fetch('http://localhost:3000/health');
      if (!response.ok) throw new Error('Server is not responding');
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', message: error.message };
    }
  }
}

export default new ApiService();