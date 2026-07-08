import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];

if (!password) {
  console.error("Uso: npm run admin:hash-password -- \"sua-senha-forte\"");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const key = scryptSync(password, salt, 64).toString("hex");

console.log(`ADMIN_PASSWORD_HASH="scrypt$${salt}$${key}"`);
