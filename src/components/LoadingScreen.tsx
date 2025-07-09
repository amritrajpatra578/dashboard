import React from "react";
import { Box, Center, Spinner, Text, VStack } from "@chakra-ui/react";

export default function LoadingScreen() {
  return (
    <Box position="fixed" inset="0" bg="white" zIndex="overlay">
      <Center h="100vh">
        <VStack gap={4}>
          <Spinner color="black" size="xl" />
          <Text fontSize="md" color="black">
            Loading, please wait...
          </Text>
        </VStack>
      </Center>
    </Box>
  );
}
