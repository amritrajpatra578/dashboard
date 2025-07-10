import { Car, cars } from "@/car";

export function getListings(): Car[] {
  return cars;
}

export function getListingById(id: number): Car | undefined {
  return cars.find((l) => l.id === id);
}

export function updateListingStatus(
  id: number,
  status: Car["status"]
): Car | undefined {
  const listing = cars.find((l) => l.id === id);
  if (listing) {
    listing.status = status;
    return listing;
  }
  return undefined;
}

export function updateListing(id: number, data: Partial<Car>): Car | null {
  const index = cars.findIndex((l) => l.id === id);
  if (index !== -1) {
    cars[index] = { ...cars[index], ...data };
    return cars[index];
  }
  return null;
}
