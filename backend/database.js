import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Client } from './entities/Client.js';
import { Device } from './entities/Device.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { app } from 'electron';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Determina o caminho do banco de dados
const dbPath = app 
  ? path.join(app.getPath('userData'), 'tecnilaser.db')
  : path.join(__dirname, '../data/tecnilaser.db');

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  synchronize: true, // Cria as tabelas automaticamente
  logging: false,
  entities: [Client, Device],
});

// Inicializa o banco de dados
export const initializeDatabase = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log('✅ Database initialized successfully');
      
      // Seed inicial se necessário
      await seedDatabase();
    }
    return AppDataSource;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

// Seed inicial de dados
const seedDatabase = async () => {
  try {
    const clientRepo = AppDataSource.getRepository('Client');
    const deviceRepo = AppDataSource.getRepository('Device');
    
    // Verifica se já existem dados
    const clientCount = await clientRepo.count();
    
    if (clientCount === 0) {
      console.log('📦 Seeding initial data...');
      
      // Cliente exemplo
      const client = await clientRepo.save({
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
      });
      
      // Dispositivo exemplo
      await deviceRepo.save({
        id: 'DEV-001',
        downloaded: false,
        clientId: client.id,
        clientName: client.name,
        clientPhone: client.phone,
        clientAddress: client.address,
        clientNeighborhood: client.neighborhood,
        device: 'TV Samsung 55"',
        defect: 'Sem imagem',
        entryDate: '2025-01-20',
        status: 'Aguardando',
        voltage: '110'
      });
      
      console.log('✅ Initial data seeded');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};