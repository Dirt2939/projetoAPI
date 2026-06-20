import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import * as u from "./user.schema.js";
import * as userController from "./user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController.handleListAll);

userRouter.post("/", validate(u.userSchema), userController.handleCreate)

userRouter.post("/bulk/create", validate(u.bulkUserSchema), userController.handleCreateMany)

userRouter.get("/bulk/search", validate(u.searchUserSchema), userController.handleFindMany)

userRouter.get("/:uuid", validate(u.userUuidSchema), userController.handleFindById);

userRouter.delete("/:uuid", validate(u.userUuidSchema), userController.handleRemove)

userRouter.put("/:uuid", validate(u.updateUserSchema), userController.handleUpdate)

//userRouter.put("/", validate(searchUserSchema), userController.handleFindMany)

