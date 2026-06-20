import { Router } from "express";
import validate from "../../shared/middleware/validate.js";
import * as a from "./auth.schema.js";
import * as authController from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", validate(a.userLoginSchema), authController.handleLogin)
