import { Text } from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import {
  ButtonGroup,
  Heading,
  IconButton,
  Stack,
  Table,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Car } from "@/car";

const cars: Car[] = [
  {
    id: 1,
    brand: "Maruti Suzuki",
    model: "Alto",
    type: "sedan",
    price: 350000,
    condition: "new",
  },
  {
    id: 2,
    brand: "Hyundai",
    model: "Creta",
    type: "suv",
    price: 1050000,
    condition: "fine",
  },
  {
    id: 3,
    brand: "Tata",
    model: "Nexon",
    type: "microSuv",
    price: 800000,
    condition: "new",
  },
  {
    id: 4,
    brand: "Mahindra",
    model: "Thar",
    type: "suv",
    price: 1400000,
    condition: "fine",
  },
  {
    id: 5,
    brand: "Honda",
    model: "City",
    type: "sedan",
    price: 1200000,
    condition: "new",
  },
  {
    id: 6,
    brand: "Toyota",
    model: "Fortuner",
    type: "suv",
    price: 3200000,
    condition: "new",
  },
  {
    id: 7,
    brand: "Kia",
    model: "Seltos",
    type: "suv",
    price: 1000000,
    condition: "fine",
  },
  {
    id: 8,
    brand: "Maruti Suzuki",
    model: "Swift",
    type: "coupe",
    price: 600000,
    condition: "bad",
  },
  {
    id: 9,
    brand: "Hyundai",
    model: "Verna",
    type: "sedan",
    price: 1100000,
    condition: "fine",
  },
  {
    id: 10,
    brand: "Tata",
    model: "Harrier",
    type: "suv",
    price: 1500000,
    condition: "new",
  },
];

const CarsTable: FunctionComponent = () => {
  const itemsPerPage = 7;

  const [page, setPage] = useState<number>(1);

  const paginatedItems = cars.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  ); // Slice items based on the current page

  const totalPages: number = Math.ceil(cars.length / itemsPerPage);

  return (
    <Stack width="full" gap="5">
      <Heading size="xl">Cars Details</Heading>
      <Table.Root size="sm" variant="outline" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Brand</Table.ColumnHeader>
            <Table.ColumnHeader>Model</Table.ColumnHeader>
            <Table.ColumnHeader>Type</Table.ColumnHeader>
            <Table.ColumnHeader>Condition</Table.ColumnHeader>
            <Table.ColumnHeader>Price</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Actions</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedItems.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.brand}</Table.Cell>
              <Table.Cell>{item.model}</Table.Cell>
              <Table.Cell>{item.type}</Table.Cell>
              <Table.Cell>{item.condition}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell textAlign="center">
                <ButtonGroup size="xs" variant="outline" gap="1">
                  <IconButton aria-label={`Approve ${item.brand}`}>
                    {<Text>✓</Text>}
                  </IconButton>
                  <IconButton aria-label={`Reject ${item.brand}`}>
                    {<Text>✕</Text>}
                  </IconButton>
                  <IconButton aria-label={`Edit ${item.brand}`}>
                    {<Text>✎</Text>}
                  </IconButton>
                </ButtonGroup>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {/* table pagination */}
      <ButtonGroup variant="ghost" size="sm" gap={2} justifyContent="center">
        <IconButton
          aria-label="Previous page"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          {<LuChevronLeft />}
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
          {<LuChevronRight />}
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
};

export default CarsTable;
