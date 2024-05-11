import bcrypt from "bcryptjs";
import db from "../models/index";
import { name } from "ejs";
// import mysql from "mysql2/promise";
// import bluebird from "bluebird";

//hash Pass
const saltRounds = 10;
const hashPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};

//create connect to database
// const connectDB = async () => {
//   const connection = await mysql.createConnection({
//     host: "127.0.0.1",
//     user: "root",
//     database: "fullstack",
//     Promise: bluebird,
//   });
//   return connection;
// };

class handleService {
  async createNewUser(username, email, password) {
    try {
      const hashPass = await hashPassword(password);
      await db.User.create({
        username: username,
        email: email,
        password: hashPass,
      });

      //way use with mysql
      // const connection = await connectDB();
      // await connection.execute(
      //   `INSERT INTO users (username,email,password) VALUES (?,?,?)`,
      //   [username, email, hashPass]
      // );
    } catch (err) {
      console.log(err);
    }
  }

  async displayUserData() {
    try {
      // const users = await db.User.findAll();
      const users = await db.User.findAll({
        nest: true,
        raw: true,
        attributes: ["id", "username", "email"],
        include: {
          attributes: ["id", "name", "description"],
          model: db.Group,
          required: true,
        },
      });
      const roles = await db.Role.findAll({
        nest: true,
        raw: true,
        attributes: ["id", "url", "description"],
        include: {
          model: db.Group,
          required: true,
          attributes: ["id", "name", "description"],
          through: {
            attributes: [],
          },
        },
      });
      // const group = await db.Group.findAll({
      //   where: { id: 2 },
      //   include: db.User,
      // });
      console.log("print user", users);
      console.log("print role", roles);
      // console.log("print group", group);
      return users;

      //way use with mysql
      // const connection = await connectDB();
      // const [rows] = await connection.execute("SELECT * FROM users");
      // return rows;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteUser(id) {
    try {
      await db.User.destroy({
        where: {
          id: id,
        },
      });

      //way use with mysql
      // const connection = await connectDB();
      // await connection.execute(`DELETE FROM users WHERE id=?`, [id]);
    } catch (e) {
      console.log(e);
    }
  }

  async displayUpdateData(id) {
    try {
      const users = await db.User.findOne({
        where: {
          id: id,
        },
      });

      //way use with mysql
      // const connection = await connectDB();
      // const [rows] = await connection.execute(
      //   `SELECT * FROM users WHERE id=?`,
      //   [id]
      // );
      return users;
    } catch (err) {
      console.log(err);
    }
  }

  async updateData(id, username, email, password) {
    try {
      const hashPass = await hashPassword(password);
      await db.User.update(
        { username: username, email: email, password: password },
        {
          where: {
            id: id,
          },
        }
      );

      //way use with mysql
      // const connection = await connectDB();
      // await connection.execute(
      //   `UPDATE users SET username=?, email=?, password=? WHERE id=?`,
      //   [username, email, hashPass, id]
      // );
    } catch (err) {
      console.log(err);
    }
  }
}
export const handleServices = new handleService();
