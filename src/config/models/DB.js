import mysql from "mysql2/promise";
import bluebird from "bluebird";
const connectToDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      database: "fullstack",
      Promise: bluebird,
    });
    console.log("Connected to MySQL database successfully.");
    return connection;
  } catch (err) {
    console.log(err);
    throw err; // Rethrow the error to handle it outside if needed
  }
};
const query = async (sql, values) => {
  try {
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(sql, values);
    await connection.end();
    return rows;
  } catch (err) {
    console.error("Error executing SQL query:", err);
    throw err; // Rethrow the error to handle it outside if needed
  }
};
export { connectToDatabase, query };
