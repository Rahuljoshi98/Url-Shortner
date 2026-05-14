import { StatusCodes } from "http-status-codes";
import { UserService } from "../services/index.js";
import { SuccessResponse, ErrorResponse } from "../utils/common/index.js";

const createUser = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    SuccessResponse.message = "User Created Successfully";
    SuccessResponse.data = {};
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something Went Wrong";
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
};

export { createUser };
