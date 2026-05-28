import prisma from "../../shared/database/prisma.js";
import {
  type CreateBulkUserBody,
  type CreateUserData,
  type UpdateUsereData,
} from "./user.schema.js";
import bcryp from "bcrypt";

export const listAll = async () => {
  return prisma.user.findMany();
};

export const findByUuid = async (uuid: string) => {
  return prisma.user.findUnique({
    where: {
      uuid,
    },
  });
};

export const findMany = async (
  userUpdate: UpdateUsereData,
) => {
  return prisma.user.findMany({
    where: {
      ...(userUpdate.name ? { name: { contains: userUpdate.name } } : {}),
      ...(userUpdate.email ? { email: { contains: userUpdate.email } } : {}),
      ...(userUpdate.role ? { role: { equals: userUpdate.role } } : {}),
    },
  });
};

export const prepareUserData = async (userData: CreateUserData) => {
  const { confirmPassword, ...preparedUser } = userData;
  preparedUser.password = await bcryp.hash(preparedUser.password, 10);

  return preparedUser;
};

export const prepareManyUserData = async (usersData: CreateBulkUserBody) => {
  const preparedUsers = await Promise.all(
    usersData.map(async ({confirmPassword, ...preparedUser}) => ({...preparedUser, password: await bcryp.hash(preparedUser.password, 10)}))
  )
  
  return preparedUsers
}

export const create = async (userData: CreateUserData) => {
  return await prisma.user.create({
    data: await prepareUserData(userData),
  });
};

export const createMany = async (usersData: CreateBulkUserBody) => {
  return await prisma.user.createMany({
    data: await prepareManyUserData(usersData),
  });
};

export const remove = async (uuid: string) => {
  return prisma.user.delete({
    where: {
      uuid,
    },
  });
};
