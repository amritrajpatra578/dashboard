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
