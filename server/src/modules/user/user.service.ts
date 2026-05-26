import prisma from "../../shared/database/prisma.js";
import type { CreateBulkUserBody, CreateUserData } from "./user.schema.js";
import bcryp from "bcrypt";

export const listAll = async () => {
  return prisma.user.findMany();
};

export const findByUuid = async (uuid: string) => {
  return prisma.user.findUnique({
    where: {
      uuid: uuid,
    },
  });
};

export const prepareUserData = async (userData: CreateUserData) => {
  const { confirmPassword, ...preparedUser } = userData;
  preparedUser.password = await bcryp.hash(preparedUser.password, 10)

  console.log(preparedUser+" PREPAREDUSER")

  return preparedUser;
};

export const create = async (userData: CreateUserData) => {
  return await prisma.user.create({
    data: await prepareUserData(userData),
  });
};

export const createMany = async (usersData: CreateBulkUserBody) => {
  return await prisma.user.createMany({
    data: usersData
  })
}

export const remove = async (uuid: string) => {
  return prisma.user.delete({
    where: {
      uuid,
    },
  });
};
