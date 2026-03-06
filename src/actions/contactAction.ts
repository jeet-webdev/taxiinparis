"use server";

import nodemailer from "nodemailer";
import { z } from "zod";

// Strong Validation Schema
const ContactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  surname: z.string().min(2, "Surname is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  captcha: z.string().refine((val) => val === "11", {
    message: "Incorrect math answer",
  }),
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
  // 1. Validate the form data
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

  // 2. Setup Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // 3. Email Body (Matching your screenshot)
  const body = `From: ${name} ${surname}\n\nEmail: ${email}\n\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`;

  try {
    await transporter.sendMail({
      from: `"Luxury Limo Paris" <${process.env.SMTP_USER}>`,
      to: process.env.SITE_CONTACT_EMAIL,
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
