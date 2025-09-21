"use server";

import prisma from "@/db/db.config";
import { portalsList } from "./basics/portals";
import { toast } from "sonner";
import { usresList } from "./basics/users";

const seedPortals = async () => {
  const res = await prisma.portal.createMany({
    data: portalsList,
  });

  if (res) {
    toast.success(`Data seed successful with total record seeded are ${res}`);
  }
  return res;
};

const seedUsers = async () => {
  const res = await prisma.user.createMany({
    data: usresList,
  });

  if (res) {
    toast.success(`Data seed successful with total record seeded are ${res}`);
  }
  return res;
};

export { seedPortals, seedUsers };
