// src/hooks/useWebSocket.ts
import { useEffect, useState, useCallback } from 'react';
import { subscribe, sendMessage, connectWebSocket } from '../websocket';

/**
 * Custom hook for interacting with WebSocket topics
 * @param topicName Topic to subscribe to (without '/topic/' prefix)
 * @returns Data from WebSocket, loading state, error state, and send function
 */
export const useWebSocket = <T>(topicName: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Pre-process the topic name to remove '/topic/' if it was included
  const processedTopic = topicName.replace(/^\/topic\//, '');
  
  // Memoize the send function to prevent unnecessary re-renders
  const send = useCallback((destination: string, message: any) => {
    // Add '/app/' prefix if not included (STOMP convention for messaging to server)
    const processedDestination = destination.startsWith('/app/') 
      ? destination 
      : `/app/${destination}`;
    
    sendMessage(processedDestination, message);
  }, []);
  
  useEffect(() => {
    // Set loading state at the beginning
    setLoading(true);
    setError(null);
    
    console.log(`Setting up WebSocket subscription for topic: ${processedTopic}`);
    
    // Explicitly ensure connection is established
    connectWebSocket();
    
    // Subscribe to the topic
    const unsubscribe = subscribe(processedTopic, (newData: T) => {
      console.log(`Received data for ${processedTopic}:`, newData);
      setData(newData);
      setLoading(false);
    });
    
    // Return cleanup function
    return () => {
      console.log(`Cleaning up subscription for ${processedTopic}`);
      unsubscribe();
    };
  }, [processedTopic]); // Only re-run if topic changes
  
  return { 
    data, 
    loading, 
    error, 
    send,
    // Convenience method for sending to the current topic
    sendToTopic: useCallback((message: any) => {
      send(processedTopic, message);
    }, [processedTopic, send])
  };
};