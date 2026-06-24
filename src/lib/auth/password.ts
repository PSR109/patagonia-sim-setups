import bcrypt from "bcryptjs";

// Hashing de contraseñas. bcrypt corre en runtime Node (no en el Proxy/edge).
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
