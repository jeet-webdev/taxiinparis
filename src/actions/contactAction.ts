"use server";

import nodemailer from "nodemailer";
import { z } from "zod";
import { getEmailSetting } from "./emailSettingAction";

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
  // 1. Captcha Validation
  const userAnswer = formData.get("captcha") as string;
  const expectedAnswer = formData.get("captchaAnswer") as string;

  if (!userAnswer || userAnswer.trim() !== expectedAnswer?.trim()) {
    return {
      error: "Please check your inputs.",
      success: false,
      fieldErrors: { captcha: ["Incorrect math answer"] },
    };
  }

  // 2. Zod Validation
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

  // 3. Load SMTP Settings
  const settings = await getEmailSetting();

  if (
    !settings.smtpHost ||
    !settings.smtpUser ||
    !settings.smtpPassword ||
    !settings.contactEmail
  ) {
    return {
      success: false,
      error: "Mail server is not configured correctly.",
    };
  }

  // 4. Create Transporter
  const transporter = nodemailer.createTransport({
    host: settings.smtpHost,
    port: Number(settings.smtpPort),
    secure: true,
    auth: {
      user: settings.smtpUser,
      pass: settings.smtpPassword,
    },
    tls: {
      rejectUnauthorized: false, // Helps with some OVH certificate issues
      minVersion: "TLSv1.2",
    },
  });

  // 5. Prepare Email Content
  // Plain text version (Fallback)
  const textBody = `New Inquiry from ${name} ${surname}\n\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;

  // HTML version (Helps avoid Spam filters)
  const htmlBody = `
    <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px;">
      <h2 style="color: #000; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Inquiry</h2>
      <p><strong>Name:</strong> ${name} ${surname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <footer style="margin-top: 30px; font-size: 12px; color: #888;">
        Sent from Luxury Limo Paris Contact Form
      </footer>
    </div>
  `;

  const mailOptions = {
    from: `"Luxury Limo Paris" <${settings.smtpUser}>`,
    to: settings.contactEmail,
    replyTo: email, // This allows you to click 'Reply' in Gmail to reach the customer
    subject: `New Inquiry from ${name} ${surname}`,
    text: textBody,
    html: htmlBody,
  };

  // 6. Send Email
  try {
    await transporter.sendMail(mailOptions);
    return { success: true, error: null };
  } catch (error) {
    return {
      success: false,
      error:
        "We encountered an error sending your message. Please try again later.",
    };
  }
}
