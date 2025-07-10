import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Car, cars } from "@/car";
import PageSidebar from "@/components/PageSidebar";
import CarConfigForm from "@/components/CarConfigForm";
import { useCarStorage } from "@/hooks";

export default function EditPage() {
  const router = useRouter();
  const { isReady, query } = router;
  const id = Number(query.id);

  const { getCarById } = useCarStorage(cars); // use default cars only if nothing is in localStorage
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (isReady && !isNaN(id)) {
      const found = getCarById(id);
      setCar(found || null);

      console.log({ found });
    }
  }, [id, isReady]);

  if (!isReady) return <Box p="8">Loading...</Box>;
  if (!car) return <Box p="8">Car not found</Box>;

  return (
    <PageSidebar>
      <Box ml={{ base: 0, md: 60 }} p="4" color="black">
        <CarConfigForm carConfig={car} />
      </Box>
    </PageSidebar>
  );
}
