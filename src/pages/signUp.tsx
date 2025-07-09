import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  Field,
  Group,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      color="black"
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.100"
    >
      <Stack gap={8} maxW="lg" py={12} px={6} w="full">
        <Stack align="center">
          <Heading fontSize="4xl">Sign up</Heading>
          <Text fontSize="lg">to enjoy all of our cool features ✌️</Text>
        </Stack>

        <Box bg="white" p={8} rounded="lg" boxShadow="lg">
          <Stack gap={4}>
            <HStack gap={4}>
              <Field.Root>
                <Field.Label>First Name</Field.Label>
                <Input type="text" />
              </Field.Root>

              <Field.Root>
                <Field.Label>Last Name</Field.Label>
                <Input type="text" />
              </Field.Root>
            </HStack>

            <Field.Root>
              <Field.Label>Email Address</Field.Label>
              <Input type="email" placeholder="you@example.com" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Group attached w="full" maxW="sm">
                <Input type={showPassword ? "text" : "password"} />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FiEye /> : <FiEyeOff />}
                </Button>
              </Group>
            </Field.Root>

            <Stack pt={4}>
              <Button
                size="lg"
                bg="blue.500"
                color="white"
                _hover={{ bg: "blue.600" }}
              >
                Sign up
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text alignSelf="center">
                Already a user? <Link color="blue.500">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
