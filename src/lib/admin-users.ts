import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { adminUsers } from "@/lib/schema";

function configuredAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function isAdminEmail(email?: string | null) {
  const normalized = email?.trim().toLowerCase();

  if (!normalized) {
    return false;
  }

  if (configuredAdminEmails().includes(normalized)) {
    return true;
  }

  const db = getDb();

  if (!db) {
    return false;
  }

  const [admin] = await db
    .select({ id: adminUsers.id })
    .from(adminUsers)
    .where(and(eq(adminUsers.email, normalized), eq(adminUsers.active, true)))
    .limit(1);

  return Boolean(admin);
}
