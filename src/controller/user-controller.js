import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { SuccessResponse, ErrorResponse } from "../utils/common/index.js";

const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    SuccessResponse.message = "User created successfully";
    SuccessResponse.data = {};
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
};

const loginUser = async (req, res) => {
  try {
    const response = await UserService.loginUser(req.body);
    SuccessResponse.message = "User logged in successfully";
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
};

export { createUser, loginUser };
