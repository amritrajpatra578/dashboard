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
