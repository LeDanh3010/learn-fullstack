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
  async getGroup(req, res) {
    try {
      const groupResults = await userApiServices.getGroup();
      return res.status(200).json({
        DT: groupResults.DT,
        message: groupResults.message,
        DE: groupResults.DE,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async create(req, res) {
    try {
      const { email, phone, password, sex, groupId } = req.body;
      if (!email || !phone || !password || !sex || !groupId) {
        return res.status(200).json({
          message: "Please fill the field correct",
          DE: "1",
        });
      } else if (password && password.length < 4) {
        return res.status(200).json({
          message: "The password greater than 3 letters ",
          DE: "1",
        });
      } else {
        const createResults = await userApiServices.createUser(req.body);
        return res.status(200).json({
          message: createResults.message,
          DE: createResults.DE,
          fieldName: createResults.fieldName,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

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
