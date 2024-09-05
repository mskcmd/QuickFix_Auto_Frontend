import { FC } from "react";
import Header from "../../Components/User/Header";
import ChatInterface from "../../Components/User/ChatInterface";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "../../Context/ChatProvider";

const ChatPage: FC = () => {
  return (
    <>
      <ChatProvider>
        <ChakraProvider>
          <Header />
          <ChatInterface />
        </ChakraProvider>
      </ChatProvider>
    </>
  );
};

export default ChatPage;
