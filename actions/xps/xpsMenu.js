"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";

// Fetch all portals from db
const getAllXpsMenus = async () => {
  try {
    const res = await prisma.xpsMenu.findMany();
    return ApiRes(true, STATUS.OK, "All Menus fetched.", res);
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while fetching ${error.message}`,
      null
    );
  }
};

export { getAllXpsMenus };
