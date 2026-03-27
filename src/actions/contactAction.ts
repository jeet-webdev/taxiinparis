"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { getEmailSetting } from "./emailSettingAction";

// ✅ captcha removed from schema — validated separately below
const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  surname: z.string().min(2, "Surname is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Phone number is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type FormState = {
  error: string | null;
  success: boolean;
  fieldErrors?: {
    name?: string[];
    surname?: string[];
    email?: string[];
    phone?: string[];
    message?: string[];
    captcha?: string[];
  };
};

export async function sendContactEmail(
  prevState: FormState | null,
  formData: FormData,
): Promise<FormState> {
  // ✅ Step 1: validate captcha server-side against the hidden answer
  const userAnswer = formData.get("captcha") as string;
  const expectedAnswer = formData.get("captchaAnswer") as string;

  if (!userAnswer || userAnswer.trim() !== expectedAnswer?.trim()) {
    return {
      error: "Please check your inputs.",
      success: false,
      fieldErrors: { captcha: ["Incorrect math answer"] },
    };
  }

  // Step 2: validate the rest of the fields
  const rawData = Object.fromEntries(formData.entries());
  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error: "Please check your inputs.",
      success: false,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, surname, email, phone, message } = validatedFields.data;

  // Step 3: fetch SMTP settings from DB
  const settings = await getEmailSetting();

  // Step 4: setup transporter
  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port: settings.smtpPort,
    secure: settings.smtpPort === 465,
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const body = `From: ${name} ${surname}\n\nEmail: ${email}\n\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`;

  try {
    await transporter.sendMail({
      from: `"Luxury Limo Paris" <${settings.smtpUser}>`,
      to: settings.contactEmail,
      replyTo: email,
      subject: "Message from Luxury Limo Paris",
      text: body,
    });

    return { success: true, error: null };
  } catch (error) {
    console.error("Mail Error:", error);
    return {
      success: false,
      error: "The mail server is currently unavailable.",
    };
  }
}
