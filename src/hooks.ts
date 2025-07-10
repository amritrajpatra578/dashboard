// hooks/useCarStorage.ts
import { useEffect, useState } from "react";
import { Auth, Car, cars } from "@/car";

const STORAGE_KEY = "cars_data";

export const useCarStorage = () => {
  const [carss, setCars] = useState<Car[]>(cars);

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

  const editCar = (updatedCar: Car) => {
    const updatedCars = carss.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCars));
    setCars(updatedCars);
  };

  const getCarById = (id: number): Car | undefined => {
    return carss.find((car) => car.id === id);
  };

  return {
    cars: carss,
    editCar,
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
        setAuth(JSON.parse(stored));
      } catch {
        setAuth({ isAllowed: false, email: "", pass: "" });
      }
    }
  }, []);

  const updateAuth = (newAuth: Auth) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAuth));
    setAuth(newAuth);
  };

  return {
    auth,
    updateAuth,
  };
};
