// backend/database.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Inicializa o banco de dados
export const initializeDatabase = async () => {
  try {
    // Testa a conexão
    await prisma.$connect();
    console.log('✅ Database connected successfully (Supabase PostgreSQL)');
    
    // Seed inicial se necessário
    await seedDatabase();
    
    return prisma;
  } catch (error) {
    console.error('❌ Error connecting to database:', error);
    throw error;
  }
};

// Seed inicial de dados
const seedDatabase = async () => {
  try {
    const clientCount = await prisma.client.count();
    
    if (clientCount === 0) {
      console.log('📦 Seeding initial data...');
      
      // Cliente exemplo
      const client = await prisma.client.create({
        data: {
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
        }
      });
      
      // Dispositivo exemplo
      await prisma.device.create({
        data: {
          clientId: client.id,
          clientName: client.name,
          clientPhone: client.phone,
          clientAddress: client.address,
          clientNeighborhood: client.neighborhood,
          device: 'TV Samsung 55"',
          defect: 'Sem imagem',
          entryDate: '2025-01-20',
          status: 'Aguardando',
          voltage: '110',
          downloaded: false
        }
      });
      
      console.log('✅ Initial data seeded');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Exporta o cliente Prisma
export { prisma };
export default prisma;
