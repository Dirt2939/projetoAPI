import prisma from "../../shared/database/prisma.js";
import bcryp from "bcrypt";
import { generateToken } from "../../shared/utils/jwt.js";

export const login = async (email: string, pass: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      uuid: true,
      name: true,
      password: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      isActive: true,
    },
  });

  if (!user) return null;

  const valid = await bcryp.compare(pass, user.password);

  if (!valid) return null;

  const { password, ...preparedUser } = user;

  const token = generateToken({
    userUuid: user.uuid, 
    email: user.email,
    role: user.role,
  });

  return { preparedUser, token };
};
