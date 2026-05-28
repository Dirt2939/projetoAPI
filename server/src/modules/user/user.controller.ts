import type { Response, Request } from "express";
import * as userService from "./user.service.js";
import type { SearchUserData } from "./user.schema.js";

export const handleSearch = async (req: Request, res: Response) => {
  if (Object.keys(req.query).length > 0) {
    const uuid = req.query.uuid as string; // Zod already take care of it
    const user = await userService.findByUuid(uuid);
    
    return res.status(200).json(user);
  }

  const users = await userService.listAll();

  return res.status(200).json(users);
};

export const handleSearchByCriteria = async (req: Request, res: Response) => {
  const queryParams = req.query as unknown as SearchUserData;

  const users = await userService.findMany(queryParams);

  return res.status(200).json(users);
};

export const handleCreate = async (req: Request, res: Response) => {
  const user = await userService.create(req.body);

  return res.status(201).json(user);
};

export const handleCreateMany = async (req: Request, res: Response) => {
  const users = await userService.createMany(req.body);

  return res.status(200).json(users);
};

export const handleRemove = async (req: Request, res: Response) => {
  const uuid = req.query.uuid as string; // Zod already take care of it

  const user = await userService.remove(uuid);

  return res.status(200).json({
    message: "User removed",
    userRemoved: user,
  });
};

export const handleUpdate = async (req: Request, res: Response) => {
  const uuid = req.query.uuid as string;
  const data = req.body;

  const user = await userService.update(uuid, data);

  return res.status(200).json(user);
};
