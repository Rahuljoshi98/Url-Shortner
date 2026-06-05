import { StatusCodes } from "http-status-codes";
import AppError from "../errors/app-errors.js";

const getAllowedFields = (allowedFields, fields) => {
  const filteredFields = allowedFields.reduce((acc, curr) => {
    if (fields[curr]) {
      acc[curr] = fields[curr];
    }
    return acc;
  }, {});

  if (Object.keys(filteredFields)?.length == 0) {
    throw new AppError(
      ["No valid fields provided for update."],
      StatusCodes.BAD_REQUEST,
    );
  }

  return filteredFields;
};

export { getAllowedFields };
