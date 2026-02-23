"use server";

import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteBlog(id: number) {
  await prisma.blog.delete({ where: { id } });
  revalidatePath("/admin/blogs");
  return { success: true };
}
