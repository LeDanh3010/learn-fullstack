import { raw } from "mysql2";
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
}

export const userApiServices = new userApiService();
