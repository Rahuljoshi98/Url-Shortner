import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/errors/app-errors.js";

const validateCreateRequest = (req, res, next) => {
  try {
    if (!req.body) {
      ErrorResponse.message = "Something went wrong while creating user.";
      ErrorResponse.error = new AppError(
        ["Request body missing"],
        StatusCodes.BAD_REQUEST,
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const { originalUrl } = req.body;
    const { userId } = req.user;
    if (!originalUrl || !userId) {
      ErrorResponse.message = "Something went wrong while creating.";
      ErrorResponse.error = new AppError(
        ["Request data missing"],
        StatusCodes.BAD_REQUEST,
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    req.body.userId = userId;
    next();
  } catch (error) {
    ErrorResponse.message = "Something went wrong while creating.";
    ErrorResponse.error = new AppError(
      [error.message],
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
};

const validateGetAllUrlRequest = (req, res, next) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      ErrorResponse.message = "Something went wrong while getting.";
      ErrorResponse.error = new AppError(
        ["Unauthorized user"],
        StatusCodes.UNAUTHORIZED,
      );
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
    }

    req.body.userId = userId;
    next();
  } catch (error) {
    ErrorResponse.message = "Something went wrong while getting.";
    ErrorResponse.error = new AppError(
      [error.message],
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
};

export { validateCreateRequest, validateGetAllUrlRequest };
