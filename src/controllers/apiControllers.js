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
    } catch (e) {
      console.log(e);
    }
  }

  async create(req, res) {}

  async update(req, res) {}

  async destroy(req, res) {
    try {
      const deleteResults = await userApiServices.destroyUser(req.body.id);
      return res.status(200).json({
        message: deleteResults.message,
        DE: deleteResults.DE,
      });
    } catch (e) {
      console.log(e);
    }
  }
}
const apiControllers = new apiController();
export default apiControllers;
