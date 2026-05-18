import { UserRepository } from "../repository/index.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcryptjs";
import AppError from "../utils/errors/app-errors.js";
import { JwtHelpers } from "../utils/common/index.js";

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

const loginUser = async (data) => {
  try {
    const { email, password } = data;
    const user = await userRepository.findByEmail(email);
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new AppError(
        ["Invalid email or password"],
        StatusCodes.BAD_REQUEST,
      );
    }

    const token = JwtHelpers.generateWebToken({ email, _id: user._id });
    return {
      _id: user._id,
      token,
    };
  } catch (error) {
    if (error.statusCode == StatusCodes.BAD_REQUEST) {
      const message = error.message || "Can't login user";
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      throw new AppError([message], statusCode);
    }
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      const message = error.message || "Can't login user";
      const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      throw new AppError([message], statusCode);
    }
    throw new AppError(["Can't login user"], StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export { createUser, loginUser };
