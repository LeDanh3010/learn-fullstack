import bcrypt from "bcryptjs";
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
  async getGroup() {
    const groups = await db.Group.findAll({
      raw: true,
      nest: true,
      attributes: ["id", "name", "description"],
    });
    return {
      DT: groups,
      message: "success",
      DE: "0",
    };
  }
  async getUserPagination(offset, limit) {
    try {
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
    } catch (e) {
      console.log(e);
    }
  }
  async createUser(user) {
    try {
      //hash Password
      const hashPassword = (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
      };
      //validate email and phone number
      const isCheck = async (field, value) => {
        const check = await db.User.findOne({
          where: {
            [field]: value,
          },
        });
        if (check) {
          return true;
        }
        return false;
      };
      const checkEmail = await isCheck("email", user.email);
      if (checkEmail) {
        return {
          message: "Email already existed",
          DE: "1",
          fieldName: "email",
        };
      }
      const checkPhone = await isCheck("phone", user.phone);
      if (checkPhone) {
        return {
          message: "Phone number already existed",
          DE: "1",
          fieldName: "phoneNumber",
        };
      }
      await db.User.create({
        username: user.username,
        email: user.email,
        phone: user.phone,
        sex: user.sex,
        address: user.address,
        password: hashPassword(user.password),
        groupId: user.groupId,
      });
      return {
        message: "Create success",
        DE: "0",
      };
    } catch (e) {
      console.log(e);
    }
  }
  async destroyUser(id) {
    try {
      const users = await db.User.destroy({
        where: {
          id: id,
        },
        force: true,
      });
      return {
        message: "Delete success",
        DE: "0",
      };
    } catch (e) {
      console.log(e);
    }
  }
}

export const userApiServices = new userApiService();
