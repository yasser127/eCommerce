import { z } from "zod";

const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(8, { message: "Password is required" }),
});

type signInType = z.infer<typeof SignInSchema>;

export { SignInSchema, type signInType };
