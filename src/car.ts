export type CarType = "coupe" | "suv" | "sedan" | "microSuv";

export type CarStatus = "pending" | "approved" | "rejected";

export interface Car {
  id: number;
  brand: string;
  model: string;
  type: CarType;
  price: number;
  status: CarStatus;
}

export const cars: Car[] = [
  {
    id: 1,
    brand: "Maruti Suzuki",
    model: "Alto",
    type: "sedan",
    price: 350000,
    status: "approved",
  },
  {
    id: 2,
    brand: "Hyundai",
    model: "Creta",
    type: "suv",
    price: 1050000,
    status: "approved",
  },
  {
    id: 3,
    brand: "Tata",
    model: "Nexon",
    type: "microSuv",
    price: 800000,
    status: "approved",
  },
  {
    id: 4,
    brand: "Mahindra",
    model: "Thar",
    type: "suv",
    price: 1400000,
    status: "approved",
  },
  {
    id: 5,
    brand: "Honda",
    model: "City",
    type: "sedan",
    price: 1200000,
    status: "approved",
  },
  {
    id: 6,
    brand: "Toyota",
    model: "Fortuner",
    type: "suv",
    price: 3200000,
    status: "rejected",
  },
  {
    id: 7,
    brand: "Kia",
    model: "Seltos",
    type: "suv",
    price: 1000000,
    status: "approved",
  },
  {
    id: 8,
    brand: "Maruti Suzuki",
    model: "Swift",
    type: "coupe",
    price: 600000,
    status: "approved",
  },
  {
    id: 9,
    brand: "Hyundai",
    model: "Verna",
    type: "sedan",
    price: 1100000,
    status: "approved",
  },
  {
    id: 10,
    brand: "Tata",
    model: "Harrier",
    type: "suv",
    price: 1500000,
    status: "approved",
  },
];

export interface Auth {
  isAllowed: boolean;
  email: string;
  pass: string;
}
