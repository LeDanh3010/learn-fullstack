import { query } from "../config/models/DB";
import bcrypt from "bcryptjs";

const saltRounds = 10;

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
};
const createNewUser = async (username, email, password) => {
  try {
    const hashPass = hashPassword(password);
    await query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashPass]
    );
  } catch (err) {
    console.log(err);
  }
};
const displayData = async () => {
  try {
    const results = await query("SELECT * FROM users ");
    return results;
  } catch (err) {
    console.log(err);
  }
};
const deleteUser = async (id) => {
  try {
    await query(`DELETE FROM users WHERE id=${id}`);
  } catch (e) {
    throw e;
  }
};
const displayDataUpdate = async (id) => {
  try {
    const results = await query(`SELECT * FROM users WHERE id=${id}`);
    return results;
  } catch (err) {
    console.log(err);
  }
};
const updateData = async (id, username, email, password) => {
  try {
    await query(
      `UPDATE users SET username = ? ,email = ? ,password = ? WHERE id=${id}`,
      [username, email, password]
    );
  } catch (err) {
    console.log(err);
  }
};
export {
  createNewUser,
  displayData,
  deleteUser,
  displayDataUpdate,
  updateData,
};
