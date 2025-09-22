"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import { logger } from "@/lib/Log";
import { userFormSchema, ZodFormValidator } from "@/lib/schema/FormSchema";
import STATUS from "@/lib/Statuses";

// Fetch all users
const getAllUsers = async () => {
  try {
    const res = await prisma.user.findMany();

    return ApiRes(true, STATUS.OK, "Fetched all users.", res);
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while fetching ${error.message}`,
      null
    );
  }
};

// Get a single user by ID
async function getUserById(id) {
  // Checking id is number or not
  if (typeof id !== Number)
    return ApiRes(
      false,
      STATUS.BAD_REQUEST,
      "Please provide valide Number typr Id."
    );

  try {
    const res = prisma.user.findUnique({ where: { id } });
    if (res) return ApiRes(true, STATUS.OK, "Fetched user details.", res);
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while fetching ${error.message}`,
      null
    );
  }
}

// Create a new user or update existing one
async function addUpdateUser({ payload, actions }) {
  try {
    // zod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: userFormSchema,
    });

    // Add new entry
    if (actions === "add") {
      const userIdProvided = [];

      if (payload.xpsId != null) userIdProvided.push(payload.xpsId);
      if (payload.eMemberId != null) userIdProvided.push(payload.eMemberId);

      // if no unique-ish fields provide from frontend, just create new record
      if (userIdProvided.length === 0) {
        const newUser = await prisma.user.create({ data: parseResult.data });

        return ApiRes(
          true,
          STATUS.CREATED,
          "New user added successfully",
          newUser
        );
      }

      // if unique-ish field is provided then check it already exist or not & then create
      const newUserCreated = await prisma.$transaction(async (tx) => {
        const existing = await tx.user.findFirst({
          where: { OR: userIdProvided },
          select: { id: true, xpsId: true, eMemberId: true },
        });

        if (existing) {
          // throw to be caught below
          const IdExist =
            existing.xpsId && data.xpsId === existing.xpsId
              ? `xpsId ${existing.xpsId}`
              : `eMemberId ${existing.eMemberId}`;

          const err = new Error(`User with ${IdExist} already exists.`);
          err.meta = { code: "CONFLICT", IdExist };
          throw err;
        }

        return tx.user.create({ data });
      });

      return ApiRes(
        true,
        STATUS.CREATED,
        "New user added successfully",
        newUserCreated
      );
    }

    // Update new entry
    if (actions === "update") {
      const { id } = payload;

      // Checking id is number or not
      if (typeof id !== Number)
        return ApiRes(
          false,
          STATUS.BAD_REQUEST,
          "Please provide valide Number typr Id."
        );

      const res = await prisma.user.update({
        where: {
          id,
        },
        data: parseResult.data,
      });

      return ApiRes(true, STATUS.OK, "User details updated successfuly", res);
    }
  } catch (error) {
    logger.db(error.message);
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error - ${error.message}`
    );
  }
}

// Delete single user
async function deleteUserById(deleteId) {
  try {
    const res = await prisma.user.delete({
      where: {
        id: deleteId,
      },
    });

    return ApiRes(true, STATUS.OK, `${res.userName} deleted successfully`, res);
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while deleting: ${error.message}`,
      null
    );
  }
}

// Delete Multiple user
async function deleteMultipleUsers(selectedIds) {
  try {
    const result = await prisma.user.deleteMany({
      where: {
        id: { in: selectedIds },
      },
    });

    return ApiRes(
      true,
      STATUS.OK,
      `${result.count} user(s) deleted successfully.`,
      result
    );
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while deleting portals: ${error.message}`,
      null
    );
  }
}

export {
  addUpdateUser,
  deleteMultipleUsers,
  deleteUserById,
  getAllUsers,
  getUserById,
};
