import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/errors/app-errors.js";

const validateCreateRequest = (req, res, next) => {
  if (!req.body) {
    ErrorResponse.message = "Something went wrong while creating user.";
    ErrorResponse.error = new AppError(
      ["Request body missing"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  const { email, password } = req.body;
  if (!email || !password) {
    ErrorResponse.message = "Something went wrong while creating user.";
    ErrorResponse.error = new AppError(
      ["Request data missing"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
};

export { validateCreateRequest };
