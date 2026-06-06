import CrudRepository from "./crud-repository.js";
import Url from "../models/url.js";

class UrlRepository extends CrudRepository {
  constructor() {
    super(Url);
  }

  async findByShortCode(shortCode) {
    const response = await Url.findOne({
      shortCode,
    });
    return response;
  }

  async findRedirectByShortCode(shortCode) {
    const response = await Url.findOne({
      shortCode,
    })
      .select("originalUrl expiresAt")
      .lean();

    if (!response) {
      throw new AppError(
        ["Not able to fetch the resource"],
        StatusCodes.NOT_FOUND,
      );
    }
    return response;
  }

  async incrementClicksByShortCode(shortCode) {
    await Url.updateOne(
      {
        shortCode,
      },
      {
        $inc: { clicks: 1 },
      },
    );
  }
}

export default UrlRepository;
