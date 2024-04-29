class homePageController {
  home(req, res, next) {
    res.render("home");
  }
  user(req, res, next) {
    res.render("user");
  }
}
const homeController = new homePageController();
export default homeController;
