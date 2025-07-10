import { Car, CarStatus } from "@/car";
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
import { useCarStorage } from "@/hooks";
import axios from "axios";

interface Props {
  initialCars: Car[];
}

const CarsTable: FunctionComponent<Props> = ({ initialCars }) => {
  const { cars, updateCarStatus } = useCarStorage(initialCars);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;

  const paginatedItems = cars.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(cars.length / itemsPerPage);

  const updateStatus = async (id: number, status: CarStatus) => {
    try {
      await axios.put(`/api/listings/${id}/status`, { status });
      updateCarStatus(id, status); // Only update status locally
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/details/${id}`);
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
                    aria-label="Approve"
                    onClick={() => updateStatus(item.id, "approved")}
                  >
                    ✓
                  </IconButton>
                  <IconButton
                    aria-label="Reject"
                    onClick={() => updateStatus(item.id, "rejected")}
                  >
                    ✕
                  </IconButton>
                  <IconButton
                    aria-label="Edit"
                    onClick={() => handleEdit(item.id)}
                  >
                    ✎
                  </IconButton>
                </ButtonGroup>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <ButtonGroup variant="ghost" size="sm" gap={2} justifyContent="center">
        <IconButton
          aria-label="Previous"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          <LuChevronLeft />
        </IconButton>
        {Array.from({ length: totalPages }).map((_, index) => (
          <IconButton
            key={index}
            aria-label={`Page ${index + 1}`}
            onClick={() => setPage(index + 1)}
            variant={page === index + 1 ? "solid" : "ghost"}
          >
            {index + 1}
          </IconButton>
        ))}
        <IconButton
          aria-label="Next"
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
