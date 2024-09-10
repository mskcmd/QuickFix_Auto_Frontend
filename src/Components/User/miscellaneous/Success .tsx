import { Box, VStack, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePaymnt } from '../../../Api/user';



const SuccessPage = () => {
  const location = useLocation();

  useEffect(() => {
    // Extract paymentId from the query params
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    console.log("ss",paymentId);
    
    if (paymentId) {
      // Call your function to update the status
      confirmPayment(paymentId);
    }
  }, [location]);

  const confirmPayment = async (paymentId: string) => {
    try {
      const result = await updatePaymnt( paymentId,'Completed')

      console.log('Payment status updated:', result.data);
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };


  return (
    <Box minHeight="80vh" display="flex" alignItems="center" justifyContent="center" bg="gray.50">
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