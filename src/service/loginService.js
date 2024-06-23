import { Op } from "sequelize";
import db from "../models";
import bcrypt from "bcryptjs";
import getGroupWithRole from "./jwtService";
import { createJWT } from "../middleware/jwtConfig";
require("dotenv").config();

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
        const groupWithRole = await getGroupWithRole(user);
        const expiresIn = process.env.JWT_EXP;
        const payLoad = {
          email: user.email,
          groupWithRole,
        };
        let token = createJWT(payLoad, expiresIn);
        return {
          message: "Login success",
          DE: "0",
          DT: {
            access_token: token,
            groupWithRole,
          },
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
