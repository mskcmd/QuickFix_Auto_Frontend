import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaSearch, FaPaperPlane, FaSmile, FaPaperclip, FaArrowLeft } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  status: 'online' | 'offline';
  lastMessage: string;
}

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
}

const ChatInterface: React.FC = () => {
  const [users] = useState<User[]>([
    { id: 1, name: 'suhail', status: 'online', lastMessage: 'Hey' },
    { id: 2, name: 'Jane Smith', status: 'offline', lastMessage: 'See you tomorrow' },
    { id: 3, name: 'Mike Johnson', status: 'online', lastMessage: 'Thanks for your help' },
    ...Array.from({ length: 10 }, (_, i): User => ({
      id: i + 4,
      name: `User ${i + 4}`,
      status: i % 2 === 0 ? 'online' : 'offline',
      lastMessage: `Message ${i + 4}`
    }))
  ]);

  const [messages] = useState<Message[]>([
    { id: 1, sender: 'suhail', text: 'Hi', time: '10:00 AM' },
    { id: 2, sender: 'You', text: 'Hello John! How are you?', time: '10:02 AM' },
    { id: 3, sender: 'John Doe', text: 'Im doing great, thanks for asking!', time: '10:05 AM' },
    ...Array.from({ length: 20 }, (_, i) => ({
      id: i + 4,
      sender: i % 2 === 0 ? 'John Doe' : 'You',
      text: `Message ${i + 4}`,
      time: `10:${(10 + i).toString().padStart(2, '0')} AM`
    }))
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('selectedUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    } else {
      localStorage.removeItem('selectedUser');
    }
  }, [selectedUser]);

  return (
<div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* User List */}
      <div className={`w-full md:w-1/4 bg-white border-r border-gray-200 ${selectedUser ? 'hidden md:flex' : 'flex'} flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center mb-4">
            <FaUser className="text-gray-500 mr-2" />
            <h2 className="text-xl font-semibold">Chats</h2>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full py-2 pl-8 pr-4 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <ul className="overflow-y-auto flex-grow">
          {users.map((user) => (
            <li key={user.id} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedUser(user)}>
              <div className="relative">
                <FaUser className="text-gray-500 text-2xl" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold">{user.name}</h3>
                <p className="text-xs text-gray-500 md:block hidden">{user.lastMessage}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center fixed w-full md:w-3/4 z-10">
              <button className="md:hidden mr-2" onClick={() => setSelectedUser(null)}>
                <FaArrowLeft className="text-gray-500" />
              </button>
              <FaUser className="text-gray-500 text-2xl mr-3" />
              <div>
                <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
                <p className="text-xs text-green-700">{selectedUser.status === 'online' ? 'Online' : 'Offline'}</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 mt-16">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs ${message.sender === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded-lg p-3`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200 fixed bottom-0 w-full md:w-3/4 z-10">
              <div className="flex items-center">
                <button className="text-gray-500 hover:text-gray-700 mr-2">
                  <FaSmile className="text-xl" />
                </button>
                <button className="text-gray-500 hover:text-gray-700 mr-2">
                  <FaPaperclip className="text-xl" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </>
        ) : (
          // Welcome Screen
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <svg className="w-48 h-48 mb-6" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="80" fill="#4299e1" />
              <path d="M65,80 Q100,120 135,80" stroke="white" strokeWidth="8" fill="none" />
              <circle cx="75" cy="65" r="10" fill="white" />
              <circle cx="125" cy="65" r="10" fill="white" />
            </svg>
            <h1 className="text-3xl font-bold mb-2">Welcome to Chat</h1>
            <p className="text-gray-600 text-center max-w-md">
              Select a conversation from the list to start chatting. Connect with friends and family easily and securely.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
