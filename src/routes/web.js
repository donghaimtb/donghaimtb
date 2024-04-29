import express from "express";
import homeController from "../controller/homeController";
// homeController tu dat

const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHelloWord);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDeleteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handelUpdateUser);

  return app.use("/", router);
};
export default initWebRoutes;