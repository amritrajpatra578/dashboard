// pages/dashboard.tsx
import { GetServerSideProps } from "next";
import CarsTable from "@/components/CarsTable";
import PageSidebar from "@/components/PageSidebar";
import { Car } from "@/car";
import axios from "axios";
import { Box } from "@chakra-ui/react";

interface Props {
  initialCars: Car[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url = "http://localhost:3000/api/listings"; // Use absolute path in production

  const res = await axios.get(url);
  return {
    props: {
      initialCars: res.data,
    },
  };
};

export default function Dashboard({ initialCars }: Props) {
  return (
    <PageSidebar>
      <Box ml={{ base: 0, md: 60 }} p="4" color="black">
        <CarsTable initialCars={initialCars} />
      </Box>
    </PageSidebar>
  );
}
