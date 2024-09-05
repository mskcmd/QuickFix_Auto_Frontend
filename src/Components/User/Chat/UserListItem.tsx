import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { FaUser } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  pic?: string;
  status?: 'online' | 'offline';
}

interface UserListItemProps {
  item: User;
  handleFunction: () => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ handleFunction, item }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      _hover={{
        background: "#F0F0F0",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      px={4}
      py={3}
      mb={2}
      borderRadius="md"
      position="relative"
    >
      <Box position="relative">
        <Avatar
          mr={3}
          size="md"
          name={item?.name}
          src={item?.pic}
        />
        <Box
          position="absolute"
          bottom={0}
          right={0}
          w="10px"
          h="10px"
          borderRadius="full"
          bg={item?.status === 'online' ? 'green.500' : 'gray.300'}
        />
      </Box>
      <Box ml={3}>
        <Text fontSize="sm" fontWeight="bold">{item?.name}</Text>
        <Text fontSize="xs" color="gray.600">
          <b>Email:</b> {item?.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
