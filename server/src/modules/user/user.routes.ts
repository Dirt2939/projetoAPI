import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import  { userSchema, userUuidSchema, searchUserSchema, bulkUserSchema } from "./user.schema.js";
import * as userController from "./user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController.handleListAll);

userRouter.get("/:uuid", validate(userUuidSchema), userController.handleFindById);

userRouter.post("/", validate(userSchema), userController.handleCreate)

userRouter.post("/bulk/create", validate(bulkUserSchema), userController.handleCreateMany)

userRouter.get("/bulk/search", validate(searchUserSchema), userController.handleFindMany)

userRouter.delete("/:uuid", validate(userUuidSchema), userController.handleRemove)

//userRouter.put("/", validate(searchUserSchema), userController.handleFindMany)

