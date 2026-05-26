import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import  { userSchema, userParamsSchema } from "./user.schema.js";
import * as userController from "./user.controller.js";
//import type { Request, Response } from "express";

export const userRouter = Router();

userRouter.get("/", userController.handleListAll);

userRouter.get("/:uuid", validate(userParamsSchema), userController.handleFindById);

userRouter.post("/", validate(userSchema), userController.handleCreate)

//userRouter.post("/", (req: Request, res: Response) => {console.log(req.body)})

userRouter.delete("/:uuid", validate(userParamsSchema), userController.handleRemove)