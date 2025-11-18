// backend/server.js
import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './database.js';
import routes from './routes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
export const startServer = async () => {
  try {
    // Inicializa o banco de dados
    await initializeDatabase();
    
    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API available at http://localhost:${PORT}/api`);
    });
    
    return app;
  } catch (error) {
    console.error('Failed to start server:', error);
    throw error;
  }
};

export default app;