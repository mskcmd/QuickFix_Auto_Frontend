import { Box } from "@chakra-ui/react";
import { useState } from "react"; // Import useState
import SideDrawer from "./Chat/SideDrawer";
import MyChat from "./Chat/MyChat";
import ChatBox from "./Chat/ChatBox";

const ChatInterface: React.FC = () => {
  const [fetchAgain, setFetchAgain] = useState<any>(false); 

  return (
    <Box className="h-screen bg-black">
      <SideDrawer />
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        height="91.5vh"
        padding="10px"
      >
        <MyChat fetchAgain={fetchAgain} />
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </Box>
  );
};

export default ChatInterface;
