import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
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
  try {
    const res = prisma.user.findUnique({ where: { id } });
    return ApiRes(true, STATUS.OK, "Fetched user details.", res);
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
  // zod form data validator
  const parseResult = ZodFormValidator({
    payload,
    formSchema: userFormSchema,
  });

  // Add new entry
  if (actions === "add") {
    const res = await prisma.user.create({ data: parseResult.data });

    return ApiRes(true, STATUS.CREATED, "New user added successfuly", res);
  }

  // Update new entry
  if (actions === "update") {
    const { id } = payload;

    const res = await prisma.user.update({
      where: {
        id,
      },
      data: parseResult.data,
    });

    return ApiRes(true, STATUS.OK, "User details updated successfuly", res);
  }
}

// Delete single user
async function deleteUser(deleteId) {
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
  getAllUsers,
  getUserById,
  addUpdateUser,
  deleteUser,
  deleteMultipleUsers,
};
