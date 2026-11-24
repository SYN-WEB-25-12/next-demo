import userRepository from "./user.repository";
import { authHelpers } from "./auth.helpers";
import sessionService from "@/lib/session";

export type AuthResult =
  | { success: true; userId: number; email: string }
  | { success: false; error: string };

export async function register(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<AuthResult> {
  const email = data.email.trim().toLowerCase();
  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();

  if (!email || !data.password) {
    return { success: false, error: "Email and password are required." };
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    return { success: false, error: "A user with this email already exists." };
  }

  const passwordHash = await authHelpers.hashPassword(data.password);

  const newUser = await userRepository.createUser({
    firstName,
    lastName,
    email,
    passwordHash,
  });

  await sessionService.create({
    userId: newUser.id,
    email: newUser.email,
    firstName: newUser.firstName,
    lastName: newUser.lastName,
  });

  return { success: true, userId: newUser.id, email: newUser.email };
}

export async function login(
  emailInput: string,
  passwordInput: string
): Promise<AuthResult> {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput;

  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  const user = await userRepository.findByEmail(email);
  if (!user) {
    return { success: false, error: "Invalid email or password." };
  }

  const isValidPassword = await authHelpers.verifyPassword(
    user.passwordHash,
    password
  );
  if (!isValidPassword) {
    return { success: false, error: "Invalid email or password." };
  }

  await sessionService.create({
    userId: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  return { success: true, userId: user.id, email: user.email };
}

export async function logout(): Promise<void> {
  const session = await sessionService.getCurrent();
  if (session) {
    await sessionService.delete(session.id);
  }
  await sessionService.deleteCookie();
}

export const authService = {
  register,
  login,
  logout,
};

export default authService;
