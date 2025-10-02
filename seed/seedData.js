"use server";

import prisma from "@/db/db.config";
import { portalsList } from "./basics/portals";
import { usresList } from "./basics/users";
import { EmMenuSeedData } from "./emember/menu";
import { XpsMenuSeedData } from "./xps/xpsMenu";
import { xpsTablesSeed } from "./database/XpsTables";

const seedPortals = async () => {
  const res = await prisma.portal.createMany({
    data: portalsList,
  });

  return res;
};

const seedUsers = async () => {
  const res = await prisma.user.createMany({
    data: usresList,
  });

  return res;
};

const seedEmMenu = async () => {
  const res = await prisma.emMenu.createMany({
    data: EmMenuSeedData,
  });

  return res;
};

// Seed XPS Menus
const seedXpsMenu = async () => {
  const res = await prisma.xpsMenu.createMany({
    data: XpsMenuSeedData,
  });

  return res;
};

//Seed XPS DB Tables
const seedXpsDbTables = async () => {
  const res = await prisma.xpsTable.createMany({ data: xpsTablesSeed });
  return res;
};

export { seedEmMenu, seedPortals, seedUsers, seedXpsMenu, seedXpsDbTables };
