import {
  Box,
  Tooltip,
  Input,
  Spinner,
  Button as ChakraButton,
  Drawer,
  useDisclosure,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  useToast,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useAppSelector } from "../../../../app/store";
import { ChatState } from "../../../../Context/MechChatProvidr";
import { allAccessChat, searchChatData } from "../../../../Api/chat";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";

interface User {
  _id: string;
  name: string;
  email: string;
}

function SideDrawer() {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingChat, setLoadingChat] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const { setSelectedChat,chats,setChats } = ChatState();

  const mechanicData = useAppSelector((state) => state.auth.mechanicData);
  const senderId: string = mechanicData?.mechnicId || "";

  const handleSearch = async () => {
    if (!search.trim()) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const data = await searchChatData(search);
      setSearchResult(data);
    } catch (error: any) {
      toast({
        title: "Error Occurred!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      console.error("Search error:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const accessChat = async (senderId: string, receiverId: string) => {
    try {
      setLoadingChat(true);
      const data = await allAccessChat(senderId, receiverId);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      onClose();
      setSelectedChat(data);
    } catch (error: any) {
      toast({
        title: "Error fetching the chat",
        description: error.message || "Unknown error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } finally {
      setLoadingChat(false);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            leftIcon={<IoMdSearch size="24px" />}
          >
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              <Box display="flex" alignItems="center" pb={2}>
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  flex="1"
                />
                <ChakraButton
                  onClick={handleSearch}
                  colorScheme="blue"
                  flexShrink={0}
                >
                  Go
                </ChakraButton>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult.map((item) => (
                  <UserListItem
                    key={item._id}
                    item={item}
                      handleFunction={() => accessChat(senderId, item._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml="auto" display="flex" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
}

export default SideDrawer;
