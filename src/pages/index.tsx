import PageSidebar from "@/components/PageSidebar";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

const Page: FunctionComponent = () => {
  return (
    <PageSidebar>
      <Box ml={{ base: 0, md: 60 }} p="4" color="black">
        <Box
          bg="gray.50"
          py={20}
          px={8}
          textAlign="center"
          minH="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Stack gap={4}>
            <Heading as="h1" size="2xl" color="black">
              🚗 Welcome to Amritraj&apos;s Carlist!
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Manage, edit, and review car rental listings effortlessly.
            </Text>
          </Stack>
        </Box>{" "}
      </Box>
    </PageSidebar>
  );
};

export default Page;
