import React from "react";
import { Box, Text, Tooltip } from "@chakra-ui/react";

interface ScrollableChatProps {
  messages: any[];
  user: { _id: string };
  hasMore: boolean;
  fetchMoreMessages?: () => void;
}

const ScrollableChat: React.FC<ScrollableChatProps> = ({ messages, user }) => {
  return (
    <Box display="flex" flexDirection="column" w="100%">
      {messages.map((m) => (
        <Box
          key={m._id}
          display="flex"
          justifyContent={m.sender._id === user._id ? "flex-end" : "flex-start"}
          mb={2}
        >
          {m.sender._id !== user._id && (
            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
              {/* <Avatar
                mt="7px"
                mr={1}
                size="sm"
                cursor="pointer"
                name={m.sender.name}
              /> */}
              <></>
            </Tooltip>
          )}
          <Box
            background={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
            borderRadius="20px"
            padding="5px 15px"
            maxWidth="75%"
            marginLeft={m.sender._id === user._id ? "0" : "10px"}
            marginTop="10px"
          >
            <Text>{m.content}</Text>
            <Text fontSize="xs" color="gray.500" textAlign="right">
              {new Date(m.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ScrollableChat;
