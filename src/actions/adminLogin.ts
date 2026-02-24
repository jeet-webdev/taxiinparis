"use server";

import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  adminLoginSchema,
  AdminLoginSchemaType,
} from "../feature/adminlogin/validations/adminLoginSchema";

export async function loginAdminAction(data: AdminLoginSchemaType) {
  const validated = adminLoginSchema.safeParse(data);

  if (!validated.success) {
    return { error: "Invalid form data" };
  }

  const { email, password } = validated.data;

  const account = await prisma.account.findUnique({
    where: { email },
  });

  if (!account || account.role !== "ADMIN") {
    return { error: "Invalid credentials" };
  }

  const isValid = await bcrypt.compare(password, account.password);

  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  //  Create session
  const session = await prisma.session.create({
    data: {
      accountId: account.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
    },
  });

  // Set HTTP-only cookie
  const cookieStore = await cookies();
  cookieStore.set("admin_session", session.id, {
    httpOnly: true,
    //secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  redirect("/admin");
}