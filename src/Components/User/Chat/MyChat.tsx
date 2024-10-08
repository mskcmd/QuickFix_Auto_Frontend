import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import ChatLoading from "./ChatLoading";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { format } from "date-fns";
import { useAppSelector } from "../../../app/store";
import { ChatState } from "../../../Context/ChatProvider";
import { fetchChats } from "../../../Api/user";
import { getSender } from "../Config/ChatLogics";

function MyChat({ fetchAgain }: any) {
  const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const userData = useAppSelector((state) => state?.auth.userData);
  const senderId = userData?.userId || "";
  const toast = useToast();
  const fetchAndSetChats = async () => {
    try {
      const data: any = await fetchChats(senderId);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    fetchAndSetChats();
  }, [fetchAgain, senderId, setChats, toast]);

  const formatLastMessageTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      return format(date, "MMM d, h:mm a");
    } catch (error) {
      console.error("Error formatting time:", error);
      return "";
    }
  };

  return (
    <>
      {" "}
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
        boxShadow="md"
        height="88vh"
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pb={3}
          px={3}
          fontSize={{ base: "20px", md: "24px" }}
          borderBottomWidth="1px"
          borderColor="gray.200"
          bg="white"
          position="sticky"
          top={0}
          zIndex={1}
          boxShadow="sm"
        >
          My Chats
        </Box>
        <Box
          display="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          borderRadius="lg"
          flex="1"
          overflowY="auto"
        >
          {chats ? (
            <Stack spacing={3}>
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={4}
                  py={3}
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: "#CBD5E0" }}
                  key={chat._id}
                >
                  <Box position="relative">
                    <FaUser className="text-gray-500 text-2xl" />
                    {chat.status === "online" && (
                      <Box
                        position="absolute"
                        bottom={0}
                        right={0}
                        w="10px"
                        h="10px"
                        borderRadius="full"
                        bg="green.500"
                      />
                    )}
                  </Box>
                  <Box ml={3}>
                    <Text fontSize="sm" fontWeight="bold">
                      {!chat.isGroupChat
                        ? getSender(userData, chat)
                        : chat.chatName}
                    </Text>
                    <Text fontSize="xs" color="gray.600">
                      {chat.latestMessageDetails?.content || "No messages yet"}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="black.400"
                      ml="auto"
                      textAlign="right"
                    >
                      {chat.latestMessageDetails?.createdAt
                        ? formatLastMessageTime(
                            chat.latestMessageDetails.createdAt
                          )
                        : ""}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
}

export default MyChat;
