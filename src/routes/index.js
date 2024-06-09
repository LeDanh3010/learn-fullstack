import api from "./api";
import homePage from "./web";

const route = (app) => {
  app.use("/", homePage);
  app.use("/api", api);
};
export default route;
