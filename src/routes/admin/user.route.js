import express from "express";
import { userList } from "../../controllers/admin/user.controller.js";
import auth from "../../middlewares/auth.js";

const userRouter = express.Router();
userRouter.use(auth);
userRouter.route("/").get(userList);

export default userRouter;
