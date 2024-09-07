import { Box, VStack, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const SuccessPage = () => {
  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
      <VStack spacing={4} textAlign="center">
        <Icon as={CheckCircleIcon} w={16} h={16} color="green.500" />
        <Heading as="h2" size="xl">Success!</Heading>
        <Text>Your action has been completed successfully.</Text>
        <Button colorScheme="green" size="lg">
          Continue
        </Button>
      </VStack>
    </Box>
  );
};

export default SuccessPage;