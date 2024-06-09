import { Op } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";

const loginService = async (rawData) => {
  try {
    const user = await db.User.findOne({
      raw: true,
      where: {
        [Op.or]: [
          { email: rawData.emailOrPhone },
          { phone: rawData.emailOrPhone },
        ],
      },
    });

    const checkPassword = (rawPass, hashPass) => {
      return bcrypt.compareSync(rawPass, hashPass);
    };

    if (user) {
      const isPassword = checkPassword(rawData.password, user.password);
      if (isPassword) {
        return {
          message: "Login success",
          DE: "0",
          data: user,
        };
      }
    }

    return {
      message: "Email or password not correct",
      DE: "1",
    };
  } catch (e) {
    return {
      message: "Login service failed",
      DE: "1",
    };
  }
};
export default loginService;
