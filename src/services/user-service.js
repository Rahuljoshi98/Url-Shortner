import { UserRepository } from "../repository/index.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import AppError from "../utils/errors/app-errors.js";

const userRepository = new UserRepository();

const createUser = async (data) => {
  try {
    const { email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.create({
      email,
      password: hashedPassword,
    });
    return user;
  } catch (error) {
    if (error.name === "ValidationError") {
      let explanation = [];

      Object.values(error.errors).forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    if (error.name === "MongoServerError" && error.code === 11000) {
      throw new AppError(["Email already exists"], StatusCodes.BAD_REQUEST);
    }

    if (error.name === "CastError") {
      throw new AppError(["Invalid ID"], StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      ["Can't create user"],
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export { createUser };
