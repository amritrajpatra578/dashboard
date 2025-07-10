import { Car, cars } from "@/car";
import CarConfigForm from "@/components/CarConfigForm";
import LoadingScreen from "@/components/LoadingScreen";
import PageSidebar from "@/components/PageSidebar";
import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent, useMemo } from "react";

const EditPage: FunctionComponent = () => {
  const { query, isReady } = useRouter();
  const id = Number(query.id);

  if (!isReady) {
    return <LoadingScreen />;
  }

  const carConfig = useMemo(() => {
    return cars.find((car) => car.id === id);
  }, [id, isReady]);

  const defaultCar: Car = carConfig || {
    brand: "BMW",
    condition: "bad",
    id: 20,
    model: "m5",
    price: 1800000,
    type: "suv",
  };

  return (
    <PageSidebar>
      <Box ml={{ base: 0, md: 60 }} p="4" color="black">
        <CarConfigForm carConfig={defaultCar} />
      </Box>
    </PageSidebar>
  );
};

export default EditPage;
