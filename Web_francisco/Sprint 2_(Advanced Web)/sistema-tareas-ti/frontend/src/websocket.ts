// src/websocket.ts
import SockJS from 'sockjs-client';
import { Client, over } from 'stompjs';
import { WebSocketMessage } from './models/WebSocketMessage';
import { Task } from './models/Task';
import { checkBackendHealth } from './api/api';

// WebSocket configuration
let stompClient: Client | null = null;
let connected = false;
let connecting = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_DELAY_BASE = 1000; // Start with 1 second delay
const subscribers: { [key: string]: ((data: any) => void)[] } = {};
const pendingMessages: { destination: string, message: any }[] = [];
const pendingSubscriptions: { topic: string, callback: (data: any) => void }[] = []; 
const activeSubscriptionIds: Set<string> = new Set();
const SOCKET_URL = 'http://localhost:8080/ws';

// Global registry to manage WebSocket instances
interface WebSocketRegistryEntry {
  connection: WebSocket;
  subscribers: number;
}

const globalWebSocketRegistry: Record<string, WebSocketRegistryEntry> = {};

/**
 * Get a shared WebSocket connection
 */
export const getWebSocketConnection = (url: string): WebSocket => {
  if (!globalWebSocketRegistry[url]) {
    const connection = new WebSocket(url);
    globalWebSocketRegistry[url] = {
      connection,
      subscribers: 1
    };
    return connection;
  } else {
    globalWebSocketRegistry[url].subscribers++;
    return globalWebSocketRegistry[url].connection;
  }
};

/**
 * Handle a subscription to a topic
 */
const handleSubscription = (topic: string, callback: (message: any) => void) => {
  if (stompClient) {
    stompClient.subscribe(topic, callback);
    activeSubscriptionIds.add(topic);
    console.log(`Successfully subscribed to ${topic}`);
  }
};

/**
 * Process any pending subscriptions
 */
const processPendingSubscriptions = () => {
  pendingSubscriptions.forEach(({ topic, callback }) => {
    if (!activeSubscriptionIds.has(`/topic/${topic}`) && stompClient) {
      handleSubscription(`/topic/${topic}`, (message) => {
        const data = JSON.parse(message.body);
        callback(data);
      });
    }
  });
  pendingSubscriptions.length = 0; // Limpiar la cola de suscripciones pendientes
};

/**
 * Solicita datos iniciales al servidor
 */
export const requestInitialData = () => {
  if (stompClient && stompClient.connected) {
    console.log("Solicitando datos iniciales...");
    stompClient.send("/app/requestInitialData", {}, JSON.stringify({}));
  } else {
    console.log("WebSocket no conectado, no se pueden solicitar datos iniciales");
  }
};

/**
 * Establishes a WebSocket connection
 */
export const connectWebSocket = async () => {
  if ((stompClient && stompClient.connected) || connecting) {
    return;
  }
  
  // Verificar si el backend está disponible
  const isBackendHealthy = await checkBackendHealth();
  if (!isBackendHealthy) {
    console.error('Backend no disponible. No se puede establecer conexión WebSocket.');
    setTimeout(connectWebSocket, 5000);
    return;
  }
  
  connecting = true;
  
  try {
    const socket = new SockJS(SOCKET_URL);
    stompClient = over(socket);
    stompClient.debug = () => {}; // Disable debug logs
    
    if (socket) {
      socket.onclose = () => {
        console.log('SockJS socket closed');
        connected = false;
        connecting = false;
        activeSubscriptionIds.clear();
        setTimeout(connectWebSocket, 5000);
      };
      
      socket.onerror = (error) => {
        console.error('SockJS socket error:', error);
      };
    }
    
    stompClient.connect({}, 
      (frame) => {
        console.log('WebSocket conectado exitosamente');
        connected = true;
        connecting = false;
        reconnectAttempts = 0; // Reset reconnect counter on successful connection
        
        // Solicitar datos iniciales después de conectarse
        setTimeout(() => {
          requestInitialData();
        }, 500);
        
        setTimeout(() => {
          subscribeToTopics();
          processPendingMessages();
          processPendingSubscriptions(); // Procesar las suscripciones pendientes
        }, 500);
      }, 
      (error) => {
        console.error('WebSocket connection error:', error);
        connected = false;
        connecting = false;
        activeSubscriptionIds.clear();
        
        const delay = Math.min(
          30000,
          RECONNECT_DELAY_BASE * Math.pow(2, reconnectAttempts)
        );
        reconnectAttempts++;
        
        if (reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`);
          setTimeout(connectWebSocket, delay);
        } else {
          console.error(`Max reconnection attempts (${MAX_RECONNECT_ATTEMPTS}) reached. Please refresh the page.`);
        }
      }
    );
  } catch (err) {
    console.error('Error initializing WebSocket:', err);
    connected = false;
    connecting = false;
    setTimeout(connectWebSocket, 5000);
  }
};

// Definir manejadores separados
const handleTasksMessage = (message: any) => {
  try {
    const tasks: Task[] = JSON.parse(message.body);
    notifySubscribers('tasks', tasks);
  } catch (e) {
    console.error('Error parsing tasks message:', e);
  }
};

const handleUsersMessage = (message: any) => {
  try {
    const users = JSON.parse(message.body);
    notifySubscribers('users', users);
  } catch (e) {
    console.error('Error parsing users message:', e);
  }
};

const handleMessagesMessage = (message: any) => {
  try {
    const webSocketMessage: WebSocketMessage = JSON.parse(message.body);
    notifySubscribers('messages', webSocketMessage);
  } catch (e) {
    console.error('Error parsing messages message:', e);
  }
};

/**
 * Subscribe to topics based on registered subscribers
 */
const subscribeToTopics = () => {
  if (!stompClient || !stompClient.connected) {
    console.log('Deferring subscriptions until connection is established');
    return;
  }
  
  try {
    if (subscribers['tasks'] && subscribers['tasks'].length > 0 && !activeSubscriptionIds.has('/topic/tasks')) {
      handleSubscription('/topic/tasks', handleTasksMessage);
    }
    
    if (subscribers['users'] && subscribers['users'].length > 0 && !activeSubscriptionIds.has('/topic/users')) {
      handleSubscription('/topic/users', handleUsersMessage);
    }
    
    if (subscribers['messages'] && subscribers['messages'].length > 0 && !activeSubscriptionIds.has('/topic/messages')) {
      handleSubscription('/topic/messages', handleMessagesMessage);
    }
  } catch (error) {
    console.error('Error subscribing to topics:', error);
    disconnectWebSocket();
    setTimeout(connectWebSocket, 1000);
  }
};

/**
 * Process any pending messages in the queue
 */
const processPendingMessages = () => {
  while (pendingMessages.length > 0) {
    const pending = pendingMessages.shift();
    if (pending) {
      sendMessage(pending.destination, pending.message);
    }
  }
};

/**
 * Disconnects the WebSocket client
 */
export const disconnectWebSocket = () => {
  if (stompClient) {
    try {
      activeSubscriptionIds.clear();
      
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('WebSocket disconnected');
          connected = false;
        });
      } else {
        stompClient = null;
        connected = false;
      }
    } catch (error) {
      console.error('Error disconnecting WebSocket:', error);
      stompClient = null;
      connected = false;
    }
  }
};

/**
 * Sends a message to the specified destination
 */
export const sendMessage = (destination: string, message: any) => {
  if (stompClient && stompClient.connected) {
    try {
      stompClient.send(destination, {}, JSON.stringify(message));
    } catch (error) {
      console.error('Error sending message:', error);
      pendingMessages.push({ destination, message });
      disconnectWebSocket();
      connectWebSocket();
    }
  } else {
    console.log('WebSocket not connected yet, queuing message');
    pendingMessages.push({ destination, message });
    connectWebSocket();
  }
};

/**
 * Subscribes to a topic
 */
export const subscribe = (topic: string, callback: (data: any) => void) => {
  if (!subscribers[topic]) {
    subscribers[topic] = [];
  }
  subscribers[topic].push(callback);
  
  console.log(`Subscribing to ${topic}, current subscriber count: ${subscribers[topic].length}`);
  
  pendingSubscriptions.push({ topic, callback });
  
  if (!connected || !stompClient || !stompClient.connected) {
    connectWebSocket();
  } else {
    subscribeToTopics();
  }
  
  return () => {
    subscribers[topic] = subscribers[topic].filter(cb => cb !== callback);
    console.log(`Unsubscribed from ${topic}, remaining subscribers: ${subscribers[topic].length}`);
  };
};

/**
 * Notifies all subscribers of a topic
 */
const notifySubscribers = (topic: string, data: any) => {
  if (subscribers[topic]) {
    subscribers[topic].forEach(callback => {
      try {
        callback(data);
      } catch (e) {
        console.error(`Error in subscriber callback for topic ${topic}:`, e);
      }
    });
  }
};
