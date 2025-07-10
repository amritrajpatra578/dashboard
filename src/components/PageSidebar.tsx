import { useAuthStorage } from "@/hooks";
import {
  Box,
  Button,
  CloseButton,
  Drawer,
  Flex,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FunctionComponent,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { IconType } from "react-icons";
import {
  FiCompass,
  FiHome,
  FiMenu,
  FiSettings,
  FiStar,
  FiTrendingUp,
} from "react-icons/fi";
import LoadingScreen from "./LoadingScreen";

const LinkItems: { name: string; icon: IconType; url: string }[] = [
  { name: "Details", icon: FiHome, url: "details" },
  { name: "Trending", icon: FiTrendingUp, url: "#" },
  { name: "Explore", icon: FiCompass, url: "#" },
  { name: "Favourites", icon: FiStar, url: "#" },
  { name: "Settings", icon: FiSettings, url: "#" },
];

const NavList: FunctionComponent = () => (
  <Box>
    {LinkItems.map((link) => (
      <Link href={link.url} key={link.name}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color="black"
          _hover={{ bg: "black", color: "white" }}
        >
          <Icon mr="4" fontSize="16" as={link.icon} />
          {link.name}
        </Flex>
      </Link>
    ))}
  </Box>
);

const PageSidebar: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { auth, logout } = useAuthStorage();
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (mounted && !auth.isAllowed) {
      router.replace("/login");
    }
  }, [auth.isAllowed, mounted, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingScreen />;
  if (!auth.isAllowed) return null;

  return (
    <Box minH="100vh" bg="gray.50">
      <Box
        display={{ base: "none", md: "block" }}
        bg="white"
        color="black"
        borderRight="1px"
        borderRightColor="gray.200"
        w={60}
        pos="fixed"
        h="full"
      >
        <Flex direction="column" justify="space-between" h="full">
          <Box>
            <Flex h="20" align="center" mx="8" justify="center">
              <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                Car
              </Text>
            </Flex>
            <NavList />
          </Box>

          <Box p="4">
            <Button
              colorScheme="red"
              size="sm"
              w="full"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
            >
              Logout
            </Button>
          </Box>
        </Flex>
      </Box>

      <Drawer.Root
        open={drawerOpen}
        closeOnEscape
        closeOnInteractOutside
        onOpenChange={(isOpen) => setDrawerOpen(isOpen.open)}
        placement="start"
        size="xs"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="white" color="black">
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" top="4" right="4" />
            </Drawer.CloseTrigger>
            <Drawer.Header>
              <Text fontSize="lg" fontWeight="bold">
                Menu
              </Text>
            </Drawer.Header>
            <Drawer.Body p={0}>
              <NavList />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      <Flex
        display={{ base: "flex", md: "none" }}
        px="4"
        h="14"
        align="center"
        bg="white"
        color="black"
        borderBottom="1px"
        borderBottomColor="gray.200"
      >
        <IconButton
          variant="outline"
          aria-label="Open menu"
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu />
        </IconButton>
        <Text ml="4" fontSize="lg" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
      </Flex>

      {children}
    </Box>
  );
};

export default PageSidebar;
