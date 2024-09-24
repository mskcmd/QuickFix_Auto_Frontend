// import { Box } from "@chakra-ui/react";
// import { MyChatProps } from "../../Type/MType";
// import { ChatState } from "../../../Context/ChatProvider";
// import SingleChat from "./SingleChat";

// function ChatBox({ fetchAgain, setFetchAgain }: MyChatProps) {
//   const { selectedChat } = ChatState();

//   return (
//     <>
//       <Box
//         display={{ base: selectedChat ? "flex" : "none", md: "flex" }}  
//         alignItems="center"
//         flexDir="column"
//         p={3}
//         bg="white"
//         w={{ base: "100%", md: "68%" }}
//         borderRadius="lg"
//         borderWidth="1px"
//       >
//         <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
//       </Box>
//     </>
//   );
// }

// export default ChatBox;

import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { MyChatProps } from "../../Type/MType";
import { ChatState } from "../../../Context/ChatProvider";
import SingleChat from "./SingleChat";
import { allMessages } from "../../../Api/user";

function ChatBox({ fetchAgain, setFetchAgain }: MyChatProps) {
  const { selectedChat } = ChatState();
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const fetchLastMessage = async () => {
      if (selectedChat) {
        try {
          const messages = await allMessages(selectedChat._id);
          if (messages.length > 0) {
            setLastMessage(messages[messages.length - 1].content);
          }
        } catch (error) {
          console.error("Failed to fetch last message", error);
        }
      }
    };

    fetchLastMessage();
  }, [selectedChat]);

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}  
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      {selectedChat ? (
        <>
          <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default ChatBox;
