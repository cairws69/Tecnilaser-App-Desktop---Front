// src/services/aiDatabaseService.js

import api from './api';

/**
 * Fetch all clients from the backend.
 */
export const fetchAllClients = async () => {
    try {
        const clients = await api.getAllClients();
        return clients;
    } catch (error) {
        console.error('Error fetching clients for AI:', error);
        throw error;
    }
};

/**
 * Fetch all devices from the backend.
 */
export const fetchAllDevices = async () => {
    try {
        const devices = await api.getAllDevices();
        return devices;
    } catch (error) {
        console.error('Error fetching devices for AI:', error);
        throw error;
    }
};

/**
 * Fetch statistics (e.g., counts, statuses) from the backend.
 */
export const fetchStatistics = async () => {
    try {
        const stats = await api.getStatistics();
        return stats;
    } catch (error) {
        console.error('Error fetching statistics for AI:', error);
        throw error;
    }
};

/**
 * Get a combined snapshot of the database useful for AI analysis.
 */
export const getDatabaseSnapshot = async () => {
    const [clients, devices, statistics] = await Promise.all([
        fetchAllClients(),
        fetchAllDevices(),
        fetchStatistics(),
    ]);
    return { clients, devices, statistics };
};
