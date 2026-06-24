import bcrypt from "bcryptjs";

// Hash bcrypt (coste 10) de una cadena aleatoria descartada. No es un secreto:
// se usa para correr una comparación "en vacío" cuando el email no existe, y así
// el login tarda lo mismo exista o no la cuenta (evita enumeración por timing).
export const DUMMY_PASSWORD_HASH =
  "$2b$10$RLv4vbje.wyI05CYhmb.tekSLUwMlOCexSasrwZSv8MKADzAVvsPy";

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
