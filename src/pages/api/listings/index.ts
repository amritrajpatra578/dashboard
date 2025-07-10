import type { NextApiRequest, NextApiResponse } from "next";
import { Car } from "@/car";
import { getListings } from "../car";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Car[] | { error: string }>
) {
  if (req.method === "GET") {
    return res.status(200).json(getListings());
  }

  res.status(405).json({ error: "Method not allowed" });
}
