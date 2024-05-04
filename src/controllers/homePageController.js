import { handleServices } from "../service/userService";

class HomePageController {
  async create(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    handleServices.createNewUser(username, email, password);
    res.redirect("/users");
  }

  home(req, res, next) {
    res.render("home");
  }

  user(req, res, next) {
    handleServices
      .displayUserData()
      .then((dataUsers) => {
        res.render("user", { dataUsers: dataUsers });
      })
      .catch(() => {
        console.log(err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  }

  delete(req, res, next) {
    handleServices
      .deleteUser(req.params.id)
      .then(() => {
        res.redirect("/users");
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("An error occurred while deleting user data.");
      });
  }

  showUpdate(req, res, next) {
    handleServices
      .displayUpdateData(req.params.id)
      .then((results) => {
        res.render("update", { data: results });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("An error occurred while fetching user data.");
      });
  }

  update(req, res, next) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    handleServices
      .updateData(req.params.id, username, email, password)
      .then(() => {
        res.redirect("/users");
      })
      .catch(() => {
        console.log(err);
        res.status(500).send("An error occurred while updating user data.");
      });
  }
}

const homeController = new HomePageController();
export default homeController;
