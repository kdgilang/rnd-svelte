import mongoose from 'mongoose';
import { MONGO_URL } from '$env/static/private';

const mongoConnection = {
  isConnected: 0,
};

export const connectDB = async () => {
  console.log('MONGO_URL', MONGO_URL);
  if (mongoConnection.isConnected === 1) {
    console.log('ya estabamos conectados');
    return;
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState;
    if (mongoConnection.isConnected === 1) {
      console.log('usando conexion existente');
      return;
    }

    await mongoose.disconnect();
  }
  await mongoose.connect(MONGO_URL ?? '');
  mongoConnection.isConnected = 1;
  console.log('conectado a mongodb', MONGO_URL ?? '');
};

export const disconnectDB = async () => {
  if (process.env.NODE_ENV === 'development') return;
  if (mongoConnection.isConnected === 0) return;

  await mongoose.disconnect();
  mongoConnection.isConnected = 0;
  console.log('desconectado de mongodb');
};