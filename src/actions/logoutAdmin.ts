"use server";

import { prisma } from "@/src/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logoutAdmin() {
    const sessionId = (await cookies()).get("admin_session")?.value;

  if (sessionId) {
    await prisma.session.deleteMany({
      where: { id: sessionId },
    });
  }

  (await cookies()).delete("admin_session");

  redirect("/login");
}