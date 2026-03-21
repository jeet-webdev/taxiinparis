"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { z } from "zod";

const schema = z.object({
  smtpHost: z.string().min(1, "SMTP Host is required"),
  smtpPort: z.coerce.number().int().min(1, "SMTP Port is required"),
  smtpUser: z.string().email("SMTP User must be a valid email"),
  smtpPassword: z.string().min(1, "SMTP Password is required"),
  contactEmail: z.string().email("Contact email must be valid"),
});

export type SmtpSettings = {
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  contactEmail: string;
};

export type EmailSettingState = {
  success: boolean;
  error: string | null;
  fieldErrors?: Partial<Record<keyof SmtpSettings, string>>;
};

export async function getEmailSetting(): Promise<SmtpSettings> {
  try {
    const s = await prisma.siteSetting.findUnique({
      where: { id: "singleton" },
    });
    return {
      smtpHost: s?.smtpHost ?? process.env.SMTP_HOST ?? "",
      smtpPort: s?.smtpPort ?? Number(process.env.SMTP_PORT ?? 587),
      smtpUser: s?.smtpUser ?? process.env.SMTP_USER ?? "",
      smtpPassword: s?.smtpPassword ?? process.env.SMTP_PASSWORD ?? "",
      contactEmail: s?.contactEmail ?? process.env.SITE_CONTACT_EMAIL ?? "",
    };
  } catch {
    return {
      smtpHost: process.env.SMTP_HOST ?? "",
      smtpPort: Number(process.env.SMTP_PORT ?? 587),
      smtpUser: process.env.SMTP_USER ?? "",
      smtpPassword: process.env.SMTP_PASSWORD ?? "",
      contactEmail: process.env.SITE_CONTACT_EMAIL ?? "",
    };
  }
}

export async function saveEmailSetting(
  _prev: EmailSettingState,
  formData: FormData,
): Promise<EmailSettingState> {
  const raw = {
    smtpHost: formData.get("smtpHost") as string,
    smtpPort: formData.get("smtpPort") as string,
    smtpUser: formData.get("smtpUser") as string,
    smtpPassword: formData.get("smtpPassword") as string,
    contactEmail: formData.get("contactEmail") as string,
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: EmailSettingState["fieldErrors"] = {};
    for (const err of parsed.error.issues) {
      const key = err.path[0] as keyof SmtpSettings;
      fieldErrors[key] = err.message;
    }
    return {
      success: false,
      error: "Please fix the errors below.",
      fieldErrors,
    };
  }

  try {
    await prisma.siteSetting.upsert({
      where: { id: "singleton" },
      update: parsed.data,
      create: { id: "singleton", ...parsed.data },
    });

    revalidatePath("/admin/email-setting");
    return { success: true, error: null };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Failed to save. Please try again." };
  }
}
