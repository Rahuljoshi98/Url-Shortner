import { StatusCodes } from "http-status-codes";
import { UrlRepository } from "../repository/index.js";
import AppError from "../utils/errors/app-errors.js";
import { PaginationHelper } from "../utils/common/index.js";

const urlRepository = new UrlRepository();

const generateShortCode = () => {
  let shortUrl = "";
  const allowedFields =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * allowedFields.length);
    shortUrl += allowedFields[randomIndex];
  }
  return shortUrl;
};

const createShortUrl = async (data) => {
  try {
    let shortCode;
    let exists = true;

    while (exists) {
      shortCode = generateShortCode();
      exists = await urlRepository.findByShortCode(shortCode);
    }
    data.shortCode = shortCode;
    const response = await urlRepository.create(data);
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let explanation = [];

      Object.values(error.errors).forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(["Url already exists"], StatusCodes.BAD_REQUEST);
    }

    if (error.name === "CastError") {
      throw new AppError(["Invalid ID"], StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      ["Can't create short url"],
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

const getAllUrls = async (data) => {
  try {
    const { page, limit } = PaginationHelper.buildPaginationOptions(data);
    const filter = { userId: data.userId };

    const response = await urlRepository.getAll({
      filter,
      page,
      limit,
    });

    return response;
  } catch (error) {
    throw new AppError(
      [error.message],
      error.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

const getOriginalLink = async (data) => {
  try {
    const { shortCode } = data;
    const filter = {
      shortCode,
    };

    const excludeFields = [
      "_id",
      "clicks",
      "expiresAt",
      "createdAt",
      "updatedAt",
    ];

    const response = await urlRepository.getOne({ filter, excludeFields });
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["URL not found"], StatusCodes.NOT_FOUND);
    }
    throw new AppError([error.message], StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const getUrlDetails = async (data) => {
  try {
    const { id, userId } = data;
    const filter = {
      _id: id,
      userId,
    };

    const response = await urlRepository.getOne({ filter });
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["URL not found"], StatusCodes.NOT_FOUND);
    }
    throw new AppError([error.message], StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

const deleteUrl = async (data) => {
  try {
    const { id, userId } = data;
    const filter = {
      _id: id,
      userId,
    };

    const response = await urlRepository.destroy({ filter });
    return response;
  } catch (error) {
    if (error.statusCode === StatusCodes.NOT_FOUND) {
      throw new AppError(["URL not found"], StatusCodes.NOT_FOUND);
    }
    throw new AppError([error.message], StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export {
  createShortUrl,
  getAllUrls,
  getOriginalLink,
  getUrlDetails,
  deleteUrl,
};
