import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ChatState {
  selectedChat: any;
  setSelectedChat: React.Dispatch<React.SetStateAction<any>>;
  userr: any | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  notification: any[];
  setNotification: React.Dispatch<React.SetStateAction<any[]>>;
  chats: any[];
  setChats: React.Dispatch<React.SetStateAction<any[]>>;
}

const MechChatContext = createContext<ChatState | null>(null);

interface ChatProviderProps {
  children: React.ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState<any>();
  const [userr, setUser] = useState<any | null>(null);
  const [notification, setNotification] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const mechInfo = localStorage.getItem("mechInfo");
    if (mechInfo) setUser(JSON.parse(mechInfo));
  }, [navigate]);

  return (
    <MechChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        userr,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </MechChatContext.Provider>
  );
};

export const ChatState = () => {
  const context = useContext(MechChatContext);
  if (!context) {
    throw new Error("useChatState must be used within a ChatProvider");
  }
  return context;
};

export default ChatProvider;
