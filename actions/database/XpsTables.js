"use server";

const { default: prisma } = require("@/db/db.config");
const { ApiRes } = require("@/lib/ApiResponse");
const { default: STATUS } = require("@/lib/Statuses");

const getAllXpsTables = async () => {
  try {
    const xpsTablesRes = await prisma.xpsTable.findMany();
    return ApiRes(true, STATUS.OK, "All Xps Tables data.", xpsTablesRes);
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while fetching ${error.message}`,
      null
    );
  }
};

export { getAllXpsTables };
