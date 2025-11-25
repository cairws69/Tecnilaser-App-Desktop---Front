// electron/main.js
import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { startServer } from '../backend/server.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow;

async function createWindow() {
  // Inicia o servidor backend
  try {
    await startServer();
    console.log('✅ Backend server started');
  } catch (error) {
    console.error('❌ Failed to start backend server:', error);
  }

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Durante o desenvolvimento (Vite ativo)
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.loadURL('http://localhost:5175');
    // Descomentar para abrir DevTools automaticamente (pode gerar avisos no console)
    // mainWindow.webContents.openDevTools();
  } else {
    // Para produção (após build do Vite)
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});