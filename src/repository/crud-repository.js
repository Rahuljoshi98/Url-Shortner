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

  async destroy({ filter }) {
    const response = await this.model.findOneAndDelete(filter);
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

  async getAll({ filter = {}, page = 1, limit = 10, excludeFields = [] }) {
    const skip = (page - 1) * limit;
    const projection = excludeFields.map((field) => `-${field}`);

    const [rows, totalDocs] = await Promise.all([
      this.model
        .find(filter)
        .select(projection)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.model.countDocuments(filter),
    ]);

    return {
      rows,
      pagination: {
        page,
        limit,
        totalDocs,
        totalPages: Math.ceil(totalDocs / limit) || 0,
        hasPrevPage: page > 1,
        hasNextPage: page * limit < totalDocs,
      },
    };
  }

  async getOne({ filter = {}, excludeFields = [] }) {
    const projection = excludeFields.map((field) => `-${field}`);

    const response = await this.model.findOne(filter).select(projection);
    if (!response) {
      throw new AppError(
        ["Not able to fetch the resource"],
        StatusCodes.NOT_FOUND,
      );
    }
    return response;
  }
}

export default CrudRepository;
