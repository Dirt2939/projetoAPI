import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import  { userSchema, userUuidSchema, searchUserSchema, bulkUserSchema } from "./user.schema.js";
import * as userController from "./user.controller.js";

export const userRouter = Router();

userRouter.get("/", userController.handleSearch);

userRouter.post("/", validate(userSchema), userController.handleCreate)

userRouter.post("/bulk/create", validate(bulkUserSchema), userController.handleCreateMany)

userRouter.get("/search", validate(searchUserSchema), userController.handleSearchByCriteria)

userRouter.delete("/:uuid", validate(userUuidSchema), userController.handleRemove)

userRouter.put("/", validate(searchUserSchema), userController.handleUpdate)