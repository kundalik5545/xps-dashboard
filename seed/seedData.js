"use server";

import prisma from "@/db/db.config";
import { portalsList } from "./basics/portals";
import { toast } from "sonner";

const seedPortals = async () => {
  const res = await prisma.portal.createMany({
    data: portalsList,
  });

  if (res) {
    toast.success(`Data seed successful with total record seeded are ${res}`);
  }
  return res;
};

export { seedPortals };
