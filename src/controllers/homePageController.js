// Get the client
import mysql from "mysql2/promise";

class homePageController {
  home(req, res, next) {
    res.render("home");
  }
  user(req, res, next) {
    res.render("user");
  }
  async create(req, res, next) {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      database: "fullstack",
    });
    try {
      const [results, fields] = await connection.query(
        "SELECT * FROM `users` "
      );
      console.log("connect to database success", results); // results contains rows returned by server
    } catch (err) {
      console.log("connect to database failed", err);
    }
  }
}
const homeController = new homePageController();
export default homeController;
