import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
const keyLength = 64;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, keyLength)) as Buffer;

  return `scrypt$${salt}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, key] = storedHash.split("$");

  if (algorithm !== "scrypt" || !salt || !key) {
    return false;
  }

  const derivedKey = (await scryptAsync(password, salt, keyLength)) as Buffer;
  const storedKey = Buffer.from(key, "hex");

  if (storedKey.length !== derivedKey.length) {
    return false;
  }

  return timingSafeEqual(storedKey, derivedKey);
}

export async function verifyAdminPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (hash) {
    return verifyPassword(password, hash);
  }

  const temporaryPassword = process.env.ADMIN_PASSWORD;

  if (temporaryPassword) {
    const provided = Buffer.from(password);
    const expected = Buffer.from(temporaryPassword);

    return provided.length === expected.length && timingSafeEqual(provided, expected);
  }

  return false;
}
