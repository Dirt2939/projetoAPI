import { Router } from "express";
import validateReq from "../../shared/middleware/validateReq.js";
import * as u from "./user.schema.js";
import * as userController from "./user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController.handleListAll);

userRouter.post("/", validateReq(u.userSchema), userController.handleCreate)

userRouter.post("/bulk/create", validateReq(u.bulkUserSchema), userController.handleCreateMany)

userRouter.get("/bulk/search", validateReq(u.searchUserSchema), userController.handleFindMany)

userRouter.get("/:uuid", validateReq(u.userUuidSchema), userController.handleFindById);

userRouter.delete("/:uuid", validateReq(u.userUuidSchema), userController.handleRemove)

userRouter.put("/:uuid", validateReq(u.updateUserSchema), userController.handleUpdate)

//userRouter.put("/", validate(searchUserSchema), userController.handleFindMany)

