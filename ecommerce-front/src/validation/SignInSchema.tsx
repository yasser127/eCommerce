import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string().min(8, { message: "Password is required" }),
});

type signInType = z.infer<typeof SignInSchema>;

export { SignInSchema, type signInType };
