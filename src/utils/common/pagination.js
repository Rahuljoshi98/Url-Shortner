import { StatusCodes } from "http-status-codes";
import AppError from "../errors/app-errors.js";

const buildPaginationOptions = (data) => {
  const pageRaw = data?.page ?? 1;
  const limitRaw = data?.limit ?? 10;

  const page = Number.parseInt(pageRaw, 10);
  const limit = Number.parseInt(limitRaw, 10);

  if (!Number.isFinite(page) || page < 1) {
    throw new AppError(["Invalid page"], StatusCodes.BAD_REQUEST);
  }
  if (!Number.isFinite(limit) || limit < 1 || limit > 100) {
    throw new AppError(["Invalid limit"], StatusCodes.BAD_REQUEST);
  }

  return { page, limit };
};

export { buildPaginationOptions };
