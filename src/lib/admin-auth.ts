import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import { isAdminEmail } from "@/lib/admin-users";

export async function getAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const allowed = await isAdminEmail(session.user.email);
  return allowed ? session : null;
}

export async function requireAdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

export async function requireAdminAction() {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("Nao autorizado.");
  }

  return session;
}
