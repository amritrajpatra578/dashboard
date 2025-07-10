import { Car } from "@/car";
import { toaster } from "@/components/ui/toaster";
import { useCarStorage } from "@/hooks";
import {
  ButtonGroup,
  Heading,
  IconButton,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FunctionComponent, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const CarsTable: FunctionComponent = () => {
  const { cars, editCar } = useCarStorage();
  const itemsPerPage = 7;
  //   const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const paginatedItems = cars.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages: number = Math.ceil(cars.length / itemsPerPage);

  const updateStatus = (id: number, status: Car["status"]) => {
    const target = cars.find((c) => c.id === id);
    if (!target) return;

    editCar({ ...target, status });

    toaster.create({
      description: `Car ID ${id} updated to ${status}`,
      type:
        status === "approved"
          ? "info"
          : status === "rejected"
          ? "warning"
          : "success",
    });

    if (status === "edit") router.push(`/details/${id}`);
  };

  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Cars Details</Heading>
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Brand</Table.ColumnHeader>
            <Table.ColumnHeader>Model</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedItems.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.brand}</Table.Cell>
              <Table.Cell>{item.model}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>
                <Text
                  fontWeight="bold"
                  color={
                    item.status === "approved"
                      ? "green.500"
                      : item.status === "rejected"
                      ? "red.500"
                      : "orange.500"
                  }
                >
                  {item.status}
                </Text>
              </Table.Cell>
              <Table.Cell textAlign="center">
                <ButtonGroup size="xs" variant="outline" gap="1">
                  <IconButton
                    aria-label={`Approve ${item.brand}`}
                    onClick={() => updateStatus(item.id, "approved")}
                  >
                    <Text>✓</Text>
                  </IconButton>
                  <IconButton
                    aria-label={`Reject ${item.brand}`}
                    onClick={() => updateStatus(item.id, "rejected")}
                  >
                    <Text>✕</Text>
                  </IconButton>
                  <IconButton
                    aria-label={`Edit ${item.brand}`}
                    onClick={() => updateStatus(item.id, "edit")}
                  >
                    <Text>✎</Text>
                  </IconButton>
                </ButtonGroup>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <ButtonGroup variant="ghost" size="sm" gap={2} justifyContent="center">
        <IconButton
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <LuChevronLeft />
        </IconButton>
        {Array.from({ length: totalPages }).map((_, index) => (
          <IconButton
            key={index}
            aria-label={`Go to page ${index + 1}`}
            onClick={() => setPage(index + 1)}
            variant={page === index + 1 ? "solid" : "ghost"}
          >
            {index + 1}
          </IconButton>
        ))}
        <IconButton
          aria-label="Next page"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          <LuChevronRight />
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
};

export default CarsTable;
