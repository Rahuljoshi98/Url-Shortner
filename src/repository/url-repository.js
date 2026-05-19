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
}

export default UrlRepository;
