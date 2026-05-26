import z from "zod";

export enum Role {
  CUSTOMER = "CUSTOMER",
  DELIVERER = "DELIVERER",
  MERCHANT = "MERCHANT",
  ADMIN = "ADMIN",
}

export const userParamsSchema = z.object({
  params: z.object({
    uuid: z.string().uuid({ message: "Invalid ID. Must be a UUID." }),
  }),
});

const greatPass = z
  .string()
  .min(8, "A senha deve ter no mínimo 8 caracteres")
  .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
  .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
  .regex(/[0-9]/, "A senha deve conter pelo menos um número")
  .regex(
    /[^a-zA-Z0-9]/,
    "A senha deve conter pelo menos um caractere especial (ex: @, #, $, etc.)",
  );

export const userSchema = z
  .object({
    name: z.string().min(4, { message: "Name is required." }),
    password: greatPass,
    confirmPassword: greatPass,
    email: z.string().email({ message: "Invalid email." }).transform(e => {return e.trim().toLowerCase()}),
    phone: z.string().nullable().optional(),
    role: z.nativeEnum(Role).default(Role.CUSTOMER),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["body", "password"],
  });

export const bulkUserSchema = z.array(userSchema)

export type CreateUserData = z.infer<typeof userSchema>;
export type CreateBulkUserBody = z.infer<typeof bulkUserSchema>
