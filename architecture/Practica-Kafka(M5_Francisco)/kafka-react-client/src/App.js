import React, { useState, useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Send, MessageCircle, Activity, Clock, Hash, Tag } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('Disconnected');
  const [isLoading, setIsLoading] = useState(false);
  const stompClient = useRef(null);

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const connectWebSocket = () => {
    const socket = new SockJS('http://localhost:8081/ws');
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      onConnect: (frame) => {
        console.log('Connected:', frame);
        setConnectionStatus('Connected');
        
        stompClient.current.subscribe('/topic/messages', (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log('Received message:', receivedMessage);
          
          setMessages(prevMessages => [
            ...prevMessages,
            {
              ...receivedMessage,
              id: Date.now() + Math.random(),
              timestamp: new Date(receivedMessage.timestamp).toLocaleString()
            }
          ]);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        setConnectionStatus('Error');
      },
      onDisconnect: () => {
        console.log('Disconnected');
        setConnectionStatus('Disconnected');
      }
    });

    stompClient.current.activate();
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) {
      alert('Por favor ingresa un mensaje');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/messages/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log('Message sent successfully:', result);
        setInputMessage('');
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error enviando mensaje: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  const getTopicColor = (topic) => {
    const colors = {
      'topico1': 'bg-blue-100 text-blue-800 border-blue-200',
      'topico2': 'bg-green-100 text-green-800 border-green-200',
      'topico3': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[topic] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPartitionColor = (partition) => {
    return partition === 0 
      ? 'bg-orange-100 text-orange-800 border-orange-200' 
      : 'bg-pink-100 text-pink-800 border-pink-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Sistema de Mensajería Kafka
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className={`w-4 h-4 ${connectionStatus === 'Connected' ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm font-medium ${connectionStatus === 'Connected' ? 'text-green-700' : 'text-red-700'}`}>
                {connectionStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Send className="w-5 h-5 mr-2" />
            Enviar Mensaje
          </h2>
          <div className="flex space-x-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu mensaje (debe contener 'topico1', 'topico2' o 'topico3')"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>{isLoading ? 'Enviando...' : 'Enviar'}</span>
            </button>
            <button
              onClick={clearMessages}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Limpiar
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            💡 Incluye "topico1", "topico2" o "topico3" en tu mensaje para dirigirlo al tópico correspondiente
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Mensajes Recibidos ({messages.length})
            </h2>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No hay mensajes aún</p>
                <p className="text-gray-400 text-sm">Los mensajes aparecerán aquí en tiempo real</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {messages.map((message) => (
                  <div key={message.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getTopicColor(message.topic)}`}>
                            <Tag className="w-3 h-3 inline mr-1" />
                            {message.topic}
                          </span>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPartitionColor(message.partition)}`}>
                            <Hash className="w-3 h-3 inline mr-1" />
                            Partición {message.partition}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-900 font-medium mb-2">{message.content}</p>
                        <div className="text-xs text-gray-500 space-x-4">
                          <span>Consumer: {message.consumerGroup}</span>
                          <span>Offset: {message.offset}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {['topico1', 'topico2', 'topico3'].map((topic) => {
            const topicMessages = messages.filter(m => m.topic === topic);
            const partition0Count = topicMessages.filter(m => m.partition === 0).length;
            const partition1Count = topicMessages.filter(m => m.partition === 1).length;
            
            return (
              <div key={topic} className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className={`text-lg font-semibold mb-4 ${getTopicColor(topic).split(' ')[1]}`}>
                  {topic.toUpperCase()}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total mensajes:</span>
                    <span className="font-medium">{topicMessages.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Partición 0:</span>
                    <span className="font-medium">{partition0Count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Partición 1:</span>
                    <span className="font-medium">{partition1Count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;