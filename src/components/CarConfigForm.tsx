"use client";

import {
  Box,
  Button,
  Field,
  Flex,
  Input,
  Portal,
  Select,
  Stack,
  createListCollection,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import LoadingScreen from "@/components/LoadingScreen";
import { Car } from "@/car";
import { useCarStorage } from "@/hooks";

const carTypes = createListCollection({
  items: [
    { label: "Coupe", value: "coupe" },
    { label: "SUV", value: "suv" },
    { label: "Sedan", value: "sedan" },
    { label: "Micro SUV", value: "microSuv" },
  ],
});

export interface CarConfigFormProps {
  carConfig: Car;
}

const CarConfigForm = ({ carConfig }: CarConfigFormProps) => {
  const { editCar } = useCarStorage();
  const [mounted, setMounted] = useState(false);
  const { push, isReady } = useRouter();

  const { register, handleSubmit, setValue, watch } = useForm<Car>({
    defaultValues: carConfig,
  });

  const id = watch("id");
  const brand = watch("brand");
  const model = watch("model");
  const price = watch("price");
  const type = watch("type");

  const emptyFields = !brand || !model || !type || price < 0;

  const onSubmit = handleSubmit((data) => {
    data.status = "pending";
    editCar(data);
    push("/details");
  });

  useEffect(() => {
    setMounted(true);
  }, [isReady]);

  if (!mounted || !isReady) {
    return <LoadingScreen />;
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.100"
      color="black"
    >
      <Stack gap={8} maxW="lg" py={12} px={6} w="full">
        <Box bg="white" p={8} rounded="lg" boxShadow="lg">
          <Stack gap={6}>
            <Field.Root>
              <Field.Label>ID*</Field.Label>
              <Input
                placeholder="0"
                type="number"
                color="black"
                value={id}
                disabled
                {...register("id", { required: true })}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Brand*</Field.Label>
              <Input
                placeholder="Brand"
                {...register("brand", { required: true })}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Model*</Field.Label>
              <Input
                placeholder="Model"
                {...register("model", { required: true })}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Type*</Field.Label>
              <Select.Root
                collection={carTypes}
                value={[type]}
                onValueChange={(val) => {
                  setValue("type", val?.value[0] as Car["type"]);
                }}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select type" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {carTypes.items.map((item) => (
                        <Select.Item color="black" key={item.value} item={item}>
                          {item.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Field.Root>

            <Field.Root>
              <Field.Label>Price*</Field.Label>
              <Input
                type="number"
                min={0}
                {...register("price", { required: true })}
              />
            </Field.Root>

            <Stack pt={4}>
              <Button
                size="lg"
                color="white"
                bg="black"
                disabled={emptyFields}
                onClick={onSubmit}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default CarConfigForm;
