/**
 * Serializes object values: converts string numbers to Number,
 * and date strings to ISO string. Leaves other values unchanged.
 * @param {Object} values
 * @returns {Object} serialized object
 */

export const serializeStringToNum = (values) => {
  const result = {};

  for (const [key, value] of Object.entries(values)) {
    if (typeof value === "string" && value.trim() === "") {
      result[key] = null;
    } else if (
      typeof value === "string" &&
      !isNaN(value) &&
      value.trim() !== ""
    ) {
      // Convert numeric strings to Number
      result[key] = Number(value);
    } else if (
      typeof value === "string" &&
      !isNaN(Date.parse(value)) &&
      value.match(/^\d{4}-\d{2}-\d{2}/)
    ) {
      // Convert date strings to ISO string
      result[key] = new Date(value).toISOString();
    } else {
      result[key] = value;
    }
  }

  return result;
};
