import express from "express";
import {
  addUser,
  deleteUser,
  editUser,
  me,
  restoreUser,
  softDeleteUser,
  userList,
} from "../../controllers/admin/user.controller.js";
import auth from "../../middlewares/auth.js";

const userRouter = express.Router();
userRouter.use(auth);
userRouter.route("/me").get(me);
userRouter.route("/").get(userList);
userRouter.route("/add").post(addUser);
userRouter.route("/edit").put(editUser);
userRouter.route("/delete/:id").delete(deleteUser);
userRouter.route("/soft-delete/:id").delete(softDeleteUser);
userRouter.route("/restore/:id").patch(restoreUser);

export default userRouter;
