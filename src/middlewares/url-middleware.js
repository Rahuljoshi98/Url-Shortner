import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/errors/app-errors.js";
import mongoose from "mongoose";

const validateCreateRequest = (req, res, next) => {
  try {
    if (!req.body) {
      ErrorResponse.message = "Something went wrong while creating.";
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

const validateGetUrlDetails = (req, res, next) => {
  try {
    if (!req.params) {
      ErrorResponse.message = "Something went wrong while creating.";
      ErrorResponse.error = new AppError(
        ["Request data missing"],
        StatusCodes.BAD_REQUEST,
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ErrorResponse.message = "Something went wrong while getting.";
      ErrorResponse.error = new AppError(
        ["Invalid url id"],
        StatusCodes.BAD_REQUEST,
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

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

const validateDeleteUrl = (req, res, next) => {
  try {
    if (!req.params) {
      ErrorResponse.message = "Something went wrong while deleting.";
      ErrorResponse.error = new AppError(
        ["Request data missing"],
        StatusCodes.BAD_REQUEST,
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      ErrorResponse.message = "Something went wrong while deleting.";
      ErrorResponse.error = new AppError(
        ["Invalid url id"],
        StatusCodes.BAD_REQUEST,
      );
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    next();
  } catch (error) {
    ErrorResponse.message = "Something went wrong while deleting.";
    ErrorResponse.error = new AppError(
      [error.message],
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
};

export { validateCreateRequest, validateGetUrlDetails, validateDeleteUrl };
