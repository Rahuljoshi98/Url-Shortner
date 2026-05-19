import { StatusCodes } from "http-status-codes";
import { UrlRepository } from "../repository/index.js";
import AppError from "../utils/errors/app-errors.js";

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

export { createShortUrl };
