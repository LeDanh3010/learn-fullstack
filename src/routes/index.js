import homePage from "./web";

const route = (app) => {
  app.use("/", homePage);
};
export default route;
