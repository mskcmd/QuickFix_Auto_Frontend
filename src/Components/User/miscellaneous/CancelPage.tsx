import { Box, VStack, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const CancelPage = () => {
  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <VStack spacing={4} textAlign="center">
        <Icon as={CloseIcon} w={16} h={16} color="red.500" />
        <Heading as="h2" size="xl">Cancelled</Heading>
        <Text>Your action has been cancelled.</Text>
        <Button colorScheme="red" size="lg">
          Back to Home
        </Button>
        <Button variant="outline" size="lg">
          Try Again
        </Button>
      </VStack>
    </Box>
  );
};

export default CancelPage;