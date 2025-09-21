"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";

const getAllPortals = async () => {
  try {
    const res = await prisma.portal.findMany();
    return ApiRes(true, STATUS.OK, "All portals fetched.", res);
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while fetching ${error.message}`,
      null
    );
  }
};

const addUpdatePortal = async ({ formData, mode }) => {
  await prisma;
};

const deletePortal = async (deleteId) => {
  try {
    const res = await prisma.portal.delete({
      where: {
        id: deleteId,
      },
    });

    return ApiRes(true, STATUS.OK, "Portal deleted successfully", res);
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while deleting: ${error.message}`,
      null
    );
  }
};

export { getAllPortals, addUpdatePortal, deletePortal };
