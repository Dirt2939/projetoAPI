import type { Response, Request } from "express";
import * as userService from "./user.service.js";
import AppError from "../../shared/errors/AppErrors.js";

export const handleListAll = async (_req: Request, res: Response) => {
  const users = await userService.listAll();

  if (!users) {
    throw new AppError(404, "No users found")
  }

  return res.status(200).json(users);
};

export const handleFindById = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string; // Zod already take care of it

  const user = await userService.findByUuid(uuid);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return res.status(200).json(user);
};

export const handleCreate = async (req: Request, res: Response) => {
  const user = await userService.create(req.body);
  console.log(req.body+" REQBODY")

  return res.status(201).json(user);
};

export const handleCreateMany = async (req: Request, res: Response) => {
  const users = await userService.createMany(req.body);

  return res.status(200).json(users);
};

export const handleRemove = async (req: Request, res: Response) => {
  const uuid = req.params.uuid as string; // Zod already take care of it

  const user = await userService.remove(uuid);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return res.status(200).json({
    message: "User removed",
    userRemoved: user,
  });
};
