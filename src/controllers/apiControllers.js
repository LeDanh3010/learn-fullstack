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
      return res.status(500).json({
        message: "Something wrong in server",
      });
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
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }
  async getEdit(req, res) {
    try {
      const editResults = await userApiServices.getUserToDisplay(req.query.id);

      return res.status(200).json({
        DT: editResults.DT,
        message: editResults.message,
        DE: editResults.DE,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Something wrong in server",
      });
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
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async update(req, res) {
    try {
      const { username, email, phone, password, address, sex, groupId } =
        req.body.updateUser;
      console.log(groupId);
      if (!groupId) {
        return res.status(200).json({
          message: "Missing group field",
          DE: "1",
        });
      }
      const updateResults = await userApiServices.updateUser(req.body.id, {
        username,
        email,
        phone,
        password,
        address,
        sex,
        groupId,
      });
      return res.status(200).json({
        message: updateResults.message,
        DE: updateResults.DE,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async destroy(req, res) {
    try {
      const deleteResults = await userApiServices.destroyUser(req.body.id);

      return res.status(200).json({
        message: deleteResults.message,
        DE: deleteResults.DE,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async userAccount(req, res) {
    try {
      return res.status(200).json({
        message: "get userAccount success",
        DE: "0",
        DT: {
          access_token: req.token,
          email: req.user.email,
          user: req.user.user,
          groupWithRole: req.user.groupWithRole,
        },
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("jwt");
      return res.status(200).json({
        message: "logout success",
        DE: "0",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async createRole(req, res) {
    try {
      const createRoleResults = await userApiServices.createRole(req.body);
      return res.status(200).json({
        message: createRoleResults.message,
        DE: createRoleResults.DE,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async getRole(req, res) {
    try {
      const page = parseInt(req.query.page) || 0;
      const pageSize = parseInt(req.query.pageSize) || 4;
      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const getRoleResults = await userApiServices.getRolePagination(
        offset,
        limit
      );

      return res.status(200).json({
        DT: getRoleResults.DT,
        message: getRoleResults.message,
        DE: getRoleResults.DE,
        totalPage: getRoleResults.totalPages,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async deleteRole(req, res) {
    try {
      const deleteRoleResults = await userApiServices.deleteRole(req.body.id);
      return res.status(200).json({
        message: deleteRoleResults.message,
        DE: deleteRoleResults.DE,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async editRole(req, res) {
    try {
      const editRoleResults = await userApiServices.editRole(req.body);
      return res.status(200).json({
        message: editRoleResults.message,
        DE: editRoleResults.DE,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async readGroup(req, res) {
    try {
      const groupResults = await userApiServices.readGroupService();
      console.log(groupResults);
      return res.status(200).json({
        DT: groupResults.DT,
        message: groupResults.message,
        DE: groupResults.DE,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }

  async getRoleInGroup(req, res) {
    try {
      const roleResults = await userApiServices.getRoleInGroup();
      return res.status(200).json({
        DT: roleResults.DT,
        message: roleResults.message,
        DE: roleResults.DE,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Something wrong in server",
      });
    }
  }
}

const apiControllers = new apiController();
export default apiControllers;
