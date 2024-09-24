import { FC } from "react";
import Header from "../../Components/Mechanic/Heder"; // Corrected the import path
import ChatInterface from "../../Components/Mechanic/ChatInterface";
import MechChatProvidr from "../../Context/MechChatProvidr";

const ChatPage: FC = () => {
  return (
    <>
      <div className="overflow-clip">
        <MechChatProvidr>
          <Header />
          <ChatInterface />
        </MechChatProvidr>
      </div>
    </>
  );
};

export default ChatPage;
