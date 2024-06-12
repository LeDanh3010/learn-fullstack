import db from "../models";

class userApiService {
  async getUsers() {
    try {
      const users = await db.User.findAll({
        raw: true,
        nest: true,
        attributes: ["id", "username", "email"],
        include: {
          attributes: ["id", "name", "description"],
          model: db.Group,
          required: true,
        },
      });
      return {
        DT: users,
        message: "success",
        DE: "0",
      };
    } catch (e) {
      console.log(e);
    }
  }
  async getUserPagination(offset, limit) {
    const { count, rows } = await db.User.findAndCountAll({
      raw: true,
      nest: true,
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email"],
      include: {
        attributes: ["id", "name", "description"],
        model: db.Group,
      },
      order: [["username", "ASC"]],
    });
    const totalPages = Math.ceil(count / limit);
    return {
      DT: rows,
      DE: "0",
      totalItems: count,
      totalPages: totalPages,
      message: "success",
    };
  }
}

export const userApiServices = new userApiService();
