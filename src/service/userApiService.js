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
      return {
        message: "getUser error",
        DE: "1",
        error: e,
      };
    }
  }
  async getGroup() {
    try {
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
    } catch {
      console.log(e);
      return {
        message: "getGroup error",
        DE: "1",
        error: e,
      };
    }
  }

  async getUserToDisplay(id) {
    try {
      const user = await db.User.findOne({
        raw: true,
        nest: true,
        where: {
          id: id,
        },
      });
      return {
        DT: user,
        message: "success",
        DE: "0",
      };
    } catch (e) {
      console.log(e);
      return {
        message: "getUserToDisplay error",
        DE: "1",
        error: e,
      };
    }
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
        order: [["id", "ASC"]],
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
      return {
        message: "getUserPagination error",
        DE: "1",
        error: e,
      };
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
      return {
        message: "createUser error",
        DE: "1",
        error: e,
      };
    }
  }
  async updateUser(id, user) {
    try {
      const { username, address, sex, groupId } = user;

      //query database
      const [updateResult] = await db.User.update(
        {
          username,
          address,
          sex,
          groupId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      if (updateResult === 0) {
        return {
          message: "Update failed",
          DE: "1",
        };
      }
      return {
        message: "Update success",
        DE: "0",
      };
    } catch (e) {
      console.log(e);
      return {
        message: "updateUser error",
        DE: "1",
        error: e,
      };
    }
  }
  async destroyUser(id) {
    try {
      const deleteUser = await db.User.destroy({
        where: {
          id: id,
        },
        force: true,
      });
      if (deleteUser === 0) {
        return {
          message: "Delete failed",
          DE: "1",
        };
      }
      return {
        message: "Delete success",
        DE: "0",
      };
    } catch (e) {
      console.log(e);
      return {
        message: "deleteUser error",
        DE: "1",
        error: e.message,
      };
    }
  }
}

export const userApiServices = new userApiService();
