import { StatusCodes } from "http-status-codes";
import AppError from "../utils/errors/app-errors.js";

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async bulkCreate(data) {
    const response = await this.model.insertMany(data);
    return response;
  }

  async get(id) {
    const response = await this.model.findById(id);
    if (!response) {
      throw new AppError(
        ["Not able to fetch the resource"],
        StatusCodes.NOT_FOUND,
      );
    }
    return response;
  }

  async getAll() {
    const response = await this.model.find({});
    return response;
  }

  async destroy(id) {
    const response = await this.model.findByIdAndRemove(id);
    if (!response) {
      throw new AppError(
        ["Not able to fetch the resource."],
        StatusCodes.NOT_FOUND,
      );
    }
    return response;
  }

  async update(data, id) {
    if (Object.keys(data)?.length === 0) {
      throw new AppError(
        ["No Data Provided To Update."],
        StatusCodes.BAD_REQUEST,
      );
    }
    // new: true returns the updated document; without it, Mongoose returns the old document
    const response = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!response) {
      throw new AppError(
        ["Not able to fetch the resource."],
        StatusCodes.NOT_FOUND,
      );
    }
    return response;
  }
}

export default CrudRepository;
