import type { NextApiRequest, NextApiResponse } from "next";
import { Car } from "@/car";
import { updateListingStatus } from "../../car";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Car | { error: string }>
) {
  const id = parseInt(req.query.id as string);

  if (isNaN(id)) return res.status(400).json({ error: "Invalid ID" });

  if (req.method === "PUT") {
    const { status } = req.body;

    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = updateListingStatus(id, status);
    if (!updated) return res.status(404).json({ error: "Listing not found" });

    return res.status(200).json(updated);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
