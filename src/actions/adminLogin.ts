"use server";

import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import {
  adminLoginSchema,
  AdminLoginSchemaType,
} from "../feature/adminlogin/validations/adminLoginSchema";

export async function loginAdminAction(data: AdminLoginSchemaType) {
  // ✅ Validate again on server (IMPORTANT)
  const validated = adminLoginSchema.safeParse(data);

  if (!validated.success) {
    return {
      error: "Invalid form data",
    };
  }

  const { email, password } = validated.data;

  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return { error: "Invalid credentials" };
  }

  const isValid = await bcrypt.compare(password, admin.password);

  if (!isValid) {
    return { error: "Invalid credentials" };
  }

  redirect("/admin");
}
