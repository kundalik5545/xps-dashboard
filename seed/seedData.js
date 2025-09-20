"use server";
import prisma from "@/db/db.config";
import { portalsList } from "./basics/portals";

const seedPortals = async () => {
  const res = await prisma.portal.createMany({
    data: portalsList,
  });

  return res;
};

export { seedPortals };
