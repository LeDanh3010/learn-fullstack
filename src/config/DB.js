//authenticate connect
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fullstack", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return sequelize;
  } catch (err) {
    console.log("Unable to connect to the database:", err);
    throw err; // Rethrow the error to handle it outside if needed
  }
};

export default connectToDatabase;
