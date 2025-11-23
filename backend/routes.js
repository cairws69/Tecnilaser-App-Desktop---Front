// backend/routes.js
import express from 'express';
import { prisma } from './database.js';

const router = express.Router();

// ============= CLIENT ROUTES =============

// Get all clients
router.get('/clients', async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get client by ID
router.get('/clients/:id', async (req, res) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.params.id },
      include: { devices: true }
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
    const client = await prisma.client.create({
      data: req.body
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update client
router.put('/clients/:id', async (req, res) => {
  try {
    const client = await prisma.client.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(client);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Delete client
router.delete('/clients/:id', async (req, res) => {
  try {
    const devices = await prisma.device.findMany({
      where: { clientId: req.params.id }
    });
    if (devices.length > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete client with associated devices' 
      });
    }
    await prisma.client.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// ============= DEVICE ROUTES =============

// Get all devices
router.get('/devices', async (req, res) => {
  try {
    const devices = await prisma.device.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get device by ID
router.get('/devices/:id', async (req, res) => {
  try {
    const device = await prisma.device.findUnique({
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
    const devices = await prisma.device.findMany({
      where: { clientId: req.params.clientId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create device
router.post('/devices', async (req, res) => {
  try {
    const device = await prisma.device.create({
      data: req.body
    });
    res.status(201).json(device);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update device
router.put('/devices/:id', async (req, res) => {
  try {
    const device = await prisma.device.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(device);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Toggle device downloaded status
router.patch('/devices/:id/toggle-downloaded', async (req, res) => {
  try {
    const device = await prisma.device.findUnique({
      where: { id: req.params.id }
    });
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    const updated = await prisma.device.update({
      where: { id: req.params.id },
      data: { downloaded: !device.downloaded }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete device
router.delete('/devices/:id', async (req, res) => {
  try {
    await prisma.device.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Device deleted successfully' });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.status(500).json({ error: error.message });
  }
});

// ============= STATISTICS ROUTES =============

router.get('/statistics', async (req, res) => {
  try {
    const totalClients = await prisma.client.count();
    const totalDevices = await prisma.device.count();
    const devicesByStatus = await prisma.device.groupBy({
      by: ['status'],
      _count: { status: true }
    });
    const formattedStatus = devicesByStatus.map(item => ({
      status: item.status,
      count: item._count.status
    }));
    res.json({ totalClients, totalDevices, devicesByStatus: formattedStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;