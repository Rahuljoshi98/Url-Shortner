import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import { decodeWebToken } from "../utils/common/jwt.js";
import AppError from "../utils/errors/app-errors.js";

const verifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      ErrorResponse.message = "Something went wrong creating short url.";
      ErrorResponse.error = new AppError(
        ["Invalid token"],
        StatusCodes.BAD_REQUEST,
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    const token = authHeader.split(" ")[1];
    const decoded = decodeWebToken(token);
    req.body = decoded.userId;
    next();
  } catch (error) {
    ErrorResponse.message = "Something went wrong creating short url.";
    ErrorResponse.error = new AppError(
      [error.message || "Something went wrong"],
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
};

export { verifyUser };
