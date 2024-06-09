import { userApiServices } from "../service/userApiService";

class apiController {
  async read(req, res) {
    try {
      const userResults = await userApiServices.getUsers();
      console.log(userResults);
      return res.status(200).json({
        users: userResults.DT,
        message: userResults.message,
        DE: userResults.DE,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async create(res, req) {}

  async update(res, req) {}

  async destroy(res, req) {}
}
const apiControllers = new apiController();
export default apiControllers;
