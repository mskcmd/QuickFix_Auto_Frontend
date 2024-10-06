import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  useToast,
  Text,
  IconButton,
  Box,
  Spinner,
  FormControl,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Input,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { FaSmile, FaPaperclip, FaPaperPlane } from "react-icons/fa";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import ScrollableChat from "./ScrollableChat";
import { allMessages, sendMessages } from "../../../Api/user";
import { ChatState } from "../../../Context/ChatProvider";
import { useAppSelector } from "../../../app/store";
import io, { Socket } from "socket.io-client";

interface Message {
  _id: string;
  sender: string;
  content: string;
  chat: string;
  createdAt: string;
  updatedAt: string;
}

const ENDPOINT = import.meta.env.VITE_REACT_APP_B_URI;

let socket: Socket;

function SingleChat({ fetchAgain, setFetchAgain }: { fetchAgain: boolean; setFetchAgain: (value: boolean) => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toast = useToast();
  const { selectedChat, setSelectedChat, notification, setNotification } = ChatState();
  const userData = useAppSelector((state) => state?.auth.userData);
  const senderId = userData?.userId || "";

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userData);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.off("connected");
      socket.off("typing");
      socket.off("stop typing");
    };
  }, [userData]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived: Message) => {
      if (!selectedChat || selectedChat._id !== newMessageReceived.chat) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [selectedChat, notification, fetchAgain, setFetchAgain, setNotification]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!selectedChat) return;
    setLoading(true);
    try {
      const data = await allMessages(selectedChat._id);
      setMessages(data);
      socket.emit("join chat", selectedChat._id);
      scrollToBottom();
    } catch (error) {
      console.error("Failed to load messages", error);
      toast({
        title: "Error Occurred!",
        description: "Failed to load the messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  }, [selectedChat, toast, scrollToBottom]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const sendMessage = async (event: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
    if (
      (event.type === "keydown" && (event as React.KeyboardEvent).key !== "Enter") ||
      (event.type === "click" && !(event.target as HTMLButtonElement).disabled)
    ) {
      return;
    }

    if (newMessage.trim() && selectedChat) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const data = await sendMessages({
          content: newMessage,
          chatId: selectedChat._id,
          senderId: senderId,
        });
        socket.emit("new message", data);
        setMessages((prevMessages) => [...prevMessages, data]);
        setNewMessage("");
        fetchMessages();
      } catch (error) {
        console.error("Failed to send message:", error);
        toast({
          title: "Error Occurred!",
          description: "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };

  const typingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewMessage((prev) => `${prev} [File: ${file.name}]`);
    }
  };

  if (!selectedChat) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100%">
        <Text fontSize="3xl" pb={3} fontFamily="Work sans">
          Click on a user to start chatting
        </Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={4}
      bg="white"
      borderRadius="lg"
      w="100%"
      h="100%"
      shadow="lg"
    >
      <Box
        fontSize={{ base: "24px", md: "28px" }}
        pb={3}
        px={2}
        w="100%"
        fontFamily="Work sans"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<ArrowBackIcon />}
          onClick={() => setSelectedChat(null)}
          aria-label="Go back"
        />
        <Text>{selectedChat?.userDetails?.name}</Text>
      </Box>

      <Box flex="1" overflowY="auto" p={4} bg="#F9F9F9" borderRadius="lg">
        {loading ? (
          <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
        ) : (
          <div className="messages">
            <ScrollableChat
              messages={messages}
              user={{ _id: senderId }}
              fetchMoreMessages={() => {}}
              hasMore={false}
            />
            <div ref={messagesEndRef} />
          </div>
        )}
      </Box>

      <FormControl
        onKeyDown={sendMessage as React.KeyboardEventHandler<HTMLDivElement>}
        isRequired
        mt={3}
      >
        {isTyping && <Text>Typing...</Text>}
        <Box display="flex" alignItems="center">
          <Popover
            isOpen={showEmojiPicker}
            onClose={() => setShowEmojiPicker(false)}
            placement="top-start"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <IconButton
                icon={<FaSmile />}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                aria-label="Emoji picker"
                variant="ghost"
                colorScheme="gray"
              />
            </PopoverTrigger>
            <PopoverContent width="250px">
              <PopoverBody>
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <IconButton
            icon={<FaPaperclip />}
            onClick={handleAttachmentClick}
            aria-label="Attach file"
            variant="ghost"
            colorScheme="gray"
          />
          <Input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <Input
            variant="outline"
            bg="gray.100"
            placeholder="Type a message..."
            value={newMessage}
            onChange={typingHandler}
            borderRadius="full"
            flex="1"
            ml={3}
          />
          <IconButton
            icon={<FaPaperPlane />}
            onClick={sendMessage as React.MouseEventHandler<HTMLButtonElement>}
            aria-label="Send message"
            variant="solid"
            colorScheme="teal"
            ml={2}
            isDisabled={!newMessage.trim()}
          />
        </Box>
      </FormControl>
    </Box>
  );
}

export default SingleChat;

