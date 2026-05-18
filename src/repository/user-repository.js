import CrudRepository from "./crud-repository.js";
import User from "../models/user.js";
import AppError from "../utils/errors/app-errors.js";
import { StatusCodes } from "http-status-codes";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findByEmail(email) {
    const response = await User.findOne({
      email,
    });
    if (!response) {
      throw new AppError(["Invalid email or password"], StatusCodes.NOT_FOUND);
    }
    return response;
  }
}

export default UserRepository;
