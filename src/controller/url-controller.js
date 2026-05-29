import { StatusCodes } from "http-status-codes";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";
import { UrlService } from "../services/index.js";

const createShortUrl = async (req, res) => {
  try {
    const response = await UrlService.createShortUrl(req.body);
    SuccessResponse.message = "Url created successfully";
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

const getAllUrls = async (req, res) => {
  try {
    const { userId } = req.user;
    const response = await UrlService.getAllUrls({
      ...req.query,
      userId,
    });
    SuccessResponse.message = "Urls fetched successfully";
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

const getOriginalLink = async (req, res) => {
  try {
    const response = await UrlService.getOriginalLink(req.params);
    SuccessResponse.message = "Urls fetched successfully";
    SuccessResponse.data = response;
    const { originalUrl } = response;
    return res.redirect(originalUrl);
  } catch (error) {
    ErrorResponse.message = "Something went wrong";
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.BAD_REQUEST)
      .json(ErrorResponse);
  }
};

export { createShortUrl, getAllUrls, getOriginalLink };
