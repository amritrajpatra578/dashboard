import { useEffect, useState } from "react";
import { Auth, Car } from "@/car";

const STORAGE_KEY = "cars_data";

export const useCarStorage = (initialCars?: Car[]) => {
  const fallbackCars: Car[] = initialCars ?? [];

  const [cars, setCars] = useState<Car[]>(fallbackCars);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCars(parsed);
        } else {
          throw new Error("Parsed data is not an array");
        }
      } catch {
        console.warn("Failed to parse stored cars, using fallback");
        setCars(fallbackCars);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackCars));
      }
    } else {
      setCars(fallbackCars);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackCars));
    }
  }, [initialCars]);

  const updateCarStatus = (id: number, status: Car["status"]) => {
    const updatedCars = cars.map((car) =>
      car.id === id ? { ...car, status } : car
    );
    setCars(updatedCars);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  };

  const editCar = (updatedCar: Car) => {
    const updatedCars = cars.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setCars(updatedCars);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
  };

  const getCarById = (id: number): Car | undefined =>
    cars.find((car) => car.id === id);

  return { cars, editCar, getCarById, updateCarStatus };
};

const AUTH_STORAGE_KEY = "auth_data";

export const useAuthStorage = () => {
  const [auth, setAuth] = useState<Auth>({
    isAllowed: false,
    email: "",
    pass: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuth(parsed);
      } catch (err) {
        console.log("failed to fetch auth data from local storage:", err);
      }
    }
  }, []);

  const updateAuth = (data: Auth) => {
    setAuth(data);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
  };

  const logout = () => {
    setAuth({ isAllowed: false, email: "", pass: "" });
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return { auth, updateAuth, logout };
};
