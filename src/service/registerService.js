import bcrypt from "bcryptjs";
import db from "../models/index";

const check = async (field, data) => {
  try {
    const isCheck = await db.User.findOne({
      where: {
        [field]: data,
      },
    });
    if (isCheck) {
      return true;
    }
    return false;
  } catch (e) {
    return {
      message: "Something wrong in check username and email",
      DE: "1",
    };
  }
};

const registerHandle = async (dataUsers) => {
  try {
    //hash password
    const saltRounds = 10;
    const hashPassword = (password) => {
      const salt = bcrypt.genSaltSync(saltRounds);
      return bcrypt.hashSync(password, salt);
    };

    //check email
    const checkEmail = await check("email", dataUsers.email);

    if (checkEmail) {
      return {
        message: "Email already existed",
        fieldName: "Email",
        DE: "1",
      };
    }
    const checkUsername = await check("username", dataUsers.username);

    if (checkUsername) {
      return {
        message: "Username already existed",
        fieldName: "Username",
        DE: "1",
      };
    }
    //create new user
    const hashPass = await hashPassword(dataUsers.password);
    const user = await db.User.create({
      username: dataUsers.username,
      email: dataUsers.email,
      phone: dataUsers.phone,
      password: hashPass,
    });
    return {
      message: "Register success",
      DE: "0",
      data: user,
    };
  } catch (e) {
    return {
      message: "Something wrong in service",
      DE: "1",
    };
  }
};
export default registerHandle;
