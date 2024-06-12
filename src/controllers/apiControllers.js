import { userApiServices } from "../service/userApiService";

class apiController {
  async read(req, res) {
    try {
      const page = parseInt(req.query.page);
      const pageSize = parseInt(req.query.pageSize);
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const paginationResults = await userApiServices.getUserPagination(
        offset,
        limit
      );
      if (!paginationResults) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.status(200).json({
        users: paginationResults.DT,
        message: paginationResults.message,
        DE: paginationResults.DE,
        totalPage: paginationResults.totalPages,
      });

      //const userResults = await userApiServices.getUsers();
      //console.log(userResults);

      // return res.status(200).json({
      //   users: userResults.DT,
      //   message: userResults.message,
      //   DE: userResults.DE,
      // });
    } catch (e) {
      console.log(e);
    }
  }

  async create(req, res) {}

  async update(req, res) {}

  async destroy(req, res) {}
}
const apiControllers = new apiController();
export default apiControllers;
