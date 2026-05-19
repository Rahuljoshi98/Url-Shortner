import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";
import { UrlService } from "../services/index.js";

const createShortUrl = async (req, res) => {
  try {
    const response = await UrlService.createShortUrl(req.body);
    SuccessResponse.message = "User logged in successfully";
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
};

export { createShortUrl };
