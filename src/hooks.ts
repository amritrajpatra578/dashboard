// hooks/useCarStorage.ts
import { useEffect, useState } from "react";
import { Car, cars } from "@/car";

const STORAGE_KEY = "cars_data";

export const useCarStorage = () => {
  const [carss, setCars] = useState<Car[]>(cars);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCars(JSON.parse(stored));
      } catch {
        setCars([]);
      }
    }
  }, []);

  // Update a specific car by ID
  const editCar = (updatedCar: Car) => {
    const updatedCars = carss.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  // Get a car by ID
  const getCarById = (id: number): Car | undefined => {
    return carss.find((car) => car.id === id);
  };

  return {
    cars: carss,
    editCar,
    getCarById,
  };
};
