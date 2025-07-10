export type CarType =
  | "coupe"
  | "suv"
  | "sedan"
  | "microSuv"
  | "hatchback"
  | "mpv";

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
  {
    id: 11,
    brand: "Renault",
    model: "Kwid",
    type: "hatchback",
    price: 450000,
    status: "pending",
  },
  {
    id: 12,
    brand: "Skoda",
    model: "Slavia",
    type: "sedan",
    price: 1200000,
    status: "approved",
  },
  {
    id: 13,
    brand: "Volkswagen",
    model: "Virtus",
    type: "sedan",
    price: 1150000,
    status: "pending",
  },
  {
    id: 14,
    brand: "MG",
    model: "Hector",
    type: "suv",
    price: 1600000,
    status: "rejected",
  },
  {
    id: 15,
    brand: "Nissan",
    model: "Magnite",
    type: "microSuv",
    price: 750000,
    status: "approved",
  },
  {
    id: 16,
    brand: "Mahindra",
    model: "XUV700",
    type: "suv",
    price: 1800000,
    status: "pending",
  },
  {
    id: 17,
    brand: "Tata",
    model: "Punch",
    type: "microSuv",
    price: 700000,
    status: "approved",
  },
  {
    id: 18,
    brand: "Hyundai",
    model: "Venue",
    type: "suv",
    price: 950000,
    status: "rejected",
  },
  {
    id: 19,
    brand: "Maruti Suzuki",
    model: "Baleno",
    type: "hatchback",
    price: 750000,
    status: "approved",
  },
  {
    id: 20,
    brand: "Toyota",
    model: "Innova HyCross",
    type: "mpv",
    price: 1900000,
    status: "approved",
  },
];

export interface Auth {
  isAllowed: boolean;
  email: string;
  pass: string;
}
