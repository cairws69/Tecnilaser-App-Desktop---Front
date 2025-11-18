// backend/routes.js
import express from 'express';
import { AppDataSource } from './database.js';

const router = express.Router();

// ============= CLIENT ROUTES =============

// Get all clients
router.get('/clients', async (req, res) => {
  try {
    const clientRepo = AppDataSource.getRepository('Client');
    const clients = await clientRepo.find({
      order: { createdAt: 'DESC' }
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get client by ID
router.get('/clients/:id', async (req, res) => {
  try {
    const clientRepo = AppDataSource.getRepository('Client');
    const client = await clientRepo.findOne({
      where: { id: req.params.id },
      relations: ['devices']
    });
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create client
router.post('/clients', async (req, res) => {
  try {
    const clientRepo = AppDataSource.getRepository('Client');
    
    // Gera ID automático
    const count = await clientRepo.count();
    const newId = `CLI-${String(count + 1).padStart(3, '0')}`;
    
    const client = await clientRepo.save({
      ...req.body,
      id: newId
    });
    
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update client
router.put('/clients/:id', async (req, res) => {
  try {
    const clientRepo = AppDataSource.getRepository('Client');
    
    const client = await clientRepo.findOne({
      where: { id: req.params.id }
    });
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    await clientRepo.update(req.params.id, req.body);
    
    const updatedClient = await clientRepo.findOne({
      where: { id: req.params.id }
    });
    
    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete client
router.delete('/clients/:id', async (req, res) => {
  try {
    const clientRepo = AppDataSource.getRepository('Client');
    const deviceRepo = AppDataSource.getRepository('Device');
    
    // Verifica se o cliente tem dispositivos
    const devices = await deviceRepo.find({
      where: { clientId: req.params.id }
    });
    
    if (devices.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete client with associated devices' 
      });
    }
    
    const result = await clientRepo.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= DEVICE ROUTES =============

// Get all devices
router.get('/devices', async (req, res) => {
  try {
    const deviceRepo = AppDataSource.getRepository('Device');
    const devices = await deviceRepo.find({
      order: { createdAt: 'DESC' }
    });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get device by ID
router.get('/devices/:id', async (req, res) => {
  try {
    const deviceRepo = AppDataSource.getRepository('Device');
    const device = await deviceRepo.findOne({
      where: { id: req.params.id }
    });
    
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    res.json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get devices by client ID
router.get('/clients/:clientId/devices', async (req, res) => {
  try {
    const deviceRepo = AppDataSource.getRepository('Device');
    const devices = await deviceRepo.find({
      where: { clientId: req.params.clientId },
      order: { createdAt: 'DESC' }
    });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create device
router.post('/devices', async (req, res) => {
  try {
    const deviceRepo = AppDataSource.getRepository('Device');
    
    // Gera ID automático
    const count = await deviceRepo.count();
    const newId = `DEV-${String(count + 1).padStart(3, '0')}`;
    
    const device = await deviceRepo.save({
      ...req.body,
      id: newId
    });
    
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update device
router.put('/devices/:id', async (req, res) => {
  try {
    const deviceRepo = AppDataSource.getRepository('Device');
    
    const device = await deviceRepo.findOne({
      where: { id: req.params.id }
    });
    
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    await deviceRepo.update(req.params.id, req.body);
    
    const updatedDevice = await deviceRepo.findOne({
      where: { id: req.params.id }
    });
    
    res.json(updatedDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle device downloaded status
router.patch('/devices/:id/toggle-downloaded', async (req, res) => {
  try {
    const deviceRepo = AppDataSource.getRepository('Device');
    
    const device = await deviceRepo.findOne({
      where: { id: req.params.id }
    });
    
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    await deviceRepo.update(req.params.id, {
      downloaded: !device.downloaded
    });
    
    const updatedDevice = await deviceRepo.findOne({
      where: { id: req.params.id }
    });
    
    res.json(updatedDevice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete device
router.delete('/devices/:id', async (req, res) => {
  try {
    const deviceRepo = AppDataSource.getRepository('Device');
    
    const result = await deviceRepo.delete(req.params.id);
    
    if (result.affected === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }
    
    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= STATISTICS ROUTES =============

// Get dashboard statistics
router.get('/statistics', async (req, res) => {
  try {
    const clientRepo = AppDataSource.getRepository('Client');
    const deviceRepo = AppDataSource.getRepository('Device');
    
    const totalClients = await clientRepo.count();
    const totalDevices = await deviceRepo.count();
    
    const devicesByStatus = await deviceRepo
      .createQueryBuilder('device')
      .select('device.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('device.status')
      .getRawMany();
    
    res.json({
      totalClients,
      totalDevices,
      devicesByStatus
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;