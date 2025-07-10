import { useEffect, useState } from "react";
import { Auth, Car, cars as defaultCars } from "@/car";

const STORAGE_KEY = "cars_data";

export const useCarStorage = (initialCars?: Car[]) => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCars(parsed);
          return;
        }
      } catch {
        console.warn("Failed to load cars from localStorage");
      }
    }

    const fallback = initialCars ?? defaultCars;
    setCars(fallback);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fallback));
  }, []);

  const updateCarStatus = (id: number, status: Car["status"]) => {
    const updated = cars.map((car) =>
      car.id === id ? { ...car, status } : car
    );
    setCars(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const editCar = (updatedCar: Car) => {
    const updated = cars.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setCars(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const getCarById = (id: number) => cars.find((car) => car.id === id);

  return {
    cars,
    editCar,
    updateCarStatus,
    getCarById,
  };
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
