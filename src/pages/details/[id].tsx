import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Car, cars as defaultCars } from "@/car";
import PageSidebar from "@/components/PageSidebar";
import CarConfigForm from "@/components/CarConfigForm";
import { useCarStorage } from "@/hooks";
import LoadingScreen from "@/components/LoadingScreen";

export default function EditPage() {
  const router = useRouter();
  const id = Number(router.query.id);

  const { cars, getCarById } = useCarStorage(defaultCars);
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (router.isReady && cars.length > 0) {
      const found = getCarById(id);
      setCar(found || null);
    }
  }, [router.isReady, id, cars]);

  if (!router.isReady || cars.length === 0 || car === null) {
    return <LoadingScreen />;
  }

  return (
    <PageSidebar>
      <Box ml={{ base: 0, md: 60 }} p="4">
        <CarConfigForm carConfig={car} />
      </Box>
    </PageSidebar>
  );
}
