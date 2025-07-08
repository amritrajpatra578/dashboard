import PageSidebar from "@/components/PageSidebar";
import { Box, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";

const Page: FunctionComponent = () => {
  return (
    <PageSidebar>
      <Box ml={{ base: 0, md: 60 }} p="4" color="black">
        <Text fontSize="xl">Welcome to my World!</Text>
      </Box>
    </PageSidebar>
  );
};

export default Page;
