import CarsTable from "@/components/CarsTable";
import PageSidebar from "@/components/PageSidebar";
import { Box } from "@chakra-ui/react";
import { FunctionComponent } from "react";

const TablePage: FunctionComponent = () => {
  return (
    <PageSidebar>
      <Box ml={{ base: 0, md: 60 }} p="4" color="black">
        <CarsTable />
      </Box>
    </PageSidebar>
  );
};

export default TablePage;
