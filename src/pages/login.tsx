import {
  Box,
  Button,
  Field,
  Flex,
  Group,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FunctionComponent, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { Auth } from "@/car";
import { useAuthStorage } from "@/hooks";

const LoginPage: FunctionComponent = () => {
  const { register, handleSubmit, watch } = useForm<Auth>();

  const { push, isReady } = useRouter();
  const { updateAuth, auth } = useAuthStorage();

  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const email = watch("email");
  const pass = watch("pass");
  const emptyFields = email === "" || pass === "";

  const onSubmit = handleSubmit((data) => {
    const isAllowed = data.email === "test" && data.pass === "test";
    updateAuth({ ...data, isAllowed });

    setAttempted(true);

    if (isAllowed) {
      push("/");
    }
  });

  useEffect(() => {
    setMounted(true);
  }, [isReady]);

  if (!mounted || !isReady) {
    return <LoadingScreen />;
  }

  const showError = attempted && !auth.isAllowed && !emptyFields;

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
          {showError && (
            <Text color="red.500" fontWeight="bold" fontSize="lg">
              Sorry you are not allowed
            </Text>
          )}
          <Stack gap={6}>
            <Field.Root>
              <Field.Label>
                Email address <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="you@example.com"
                type="email"
                {...register("email", { required: true })}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>
                Password <Field.RequiredIndicator />
              </Field.Label>
              <Group attached w="full">
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("pass", { required: true })}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  bg="black"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FiEye color="white" />
                  ) : (
                    <FiEyeOff color="white" />
                  )}
                </Button>
              </Group>
            </Field.Root>

            <Stack pt={4}>
              <Button
                size="lg"
                color="white"
                bg="black"
                disabled={emptyFields}
                onClick={onSubmit}
              >
                Confirm
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
