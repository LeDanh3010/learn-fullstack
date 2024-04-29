class homePageController {
  home(req, res, next) {
    res.send("Hello world");
  }
}
const homeController = new homePageController();
export default homeController;
