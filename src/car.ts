export type CarType = "coupe" | "suv" | "sedan" | "microSuv";

export type CarCondition = "new" | "fine" | "bad";

export interface Car {
  id: number;
  brand: string;
  model: string;
  type: CarType;
  price: number;
  condition: CarCondition;
}

export const cars: Car[] = [
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
