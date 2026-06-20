import prisma from "../../shared/database/prisma.js";
import bcryp from "bcrypt";

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

  return preparedUser;
};
