
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Authenticate = localStorage.getItem('authorization') || '';
const userid = localStorage.getItem('userId') || '';

const socket = io('http://localhost:3000', {
  extraHeaders: {
    'Authorization': Authenticate,
  }
});

const Chat =  () => {
  const [message, setMessage] = useState(''); 
  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/message', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': Authenticate
          },
        });
        
        
        const data = await response.json();
        setMessages(data);      
  
      } catch (error) {
        console.error('Error al obtener los mensajes:', error);
      }
    };
  
    fetchData();
  }, [])
  
  
  useEffect(() => {
    
    socket.on('connect', () => {
      console.log('Connected to server:', socket.id);
    });

    socket.on('Mensaje', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('Mensaje');
    };
  }, []);

  const sendMessage = () => {
    
    if (message.trim() !== '') {

      socket.emit('mensaje', { content: message, userId: parseFloat(userid) });
      setMessage('');
    }
  };

  return (
    <div className='chat-container'>
      <div className='chat'>
      <h2>Chat</h2>
      <div className='messages'>
        {messages.map((messages, index) => (
          <div
            key={index}
            className={`message ${messages.userId === parseFloat(userid) ? 'sent' : 'received'}`}
          >
            {messages.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu mensaje..."
      />
      <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chat;
