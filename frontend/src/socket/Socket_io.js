// socket/Socket_io.js
import { io } from 'socket.io-client';

const urls = [
  import.meta.env.VITE_BASE_URL,
  // Add more fallback URLs if needed
];

let socket = null;

const connectSocket = async () => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    console.warn('⚠️ No userId found in localStorage');
    return null;
  }

  for (let url of urls) {
    const tempSocket = io(url, {
      timeout: 3000,
      reconnectionAttempts: 2,
      transports: ['websocket'],
      query: { userId },
    });

    const success = await new Promise((resolve) => {
      tempSocket.on('connect', () => {
        console.log(`✅ Connected to ${url}`);
        resolve(true);
      });

      tempSocket.on('connect_error', (err) => {
        console.warn(`❌ Failed to connect to ${url}:`, err.message);
        tempSocket.disconnect();
        resolve(false);
      });

      setTimeout(() => resolve(false), 3500);
    });

    if (success) {
      socket = tempSocket;
      break;
    }
  }

  return socket;
};

export const getSocket = async () => {
  if (!socket) {
    socket = await connectSocket();
  }
  return socket;
};
