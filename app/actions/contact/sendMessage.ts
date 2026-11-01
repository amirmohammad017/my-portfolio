"use server";

import { revalidatePath } from "next/cache";
import connectDb from "@/config/database";
import ContactMessage from "@/models/contact/ContactMessage";

export type ContactState = {
  ok?: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessageAction(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: hidden field that only bots fill in
  if (String(formData.get("website") ?? "")) return { ok: true };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: NonNullable<ContactState["fieldErrors"]> = {};
  if (!name || name.length > 100) fieldErrors.name = "Please enter your name.";
  if (!EMAIL_RE.test(email) || email.length > 200)
    fieldErrors.email = "Please enter a valid email.";
  if (!message || message.length > 2000)
    fieldErrors.message = "Message must be between 1 and 2000 characters.";

  if (Object.keys(fieldErrors).length) return { fieldErrors };

  try {
    await connectDb();
    await ContactMessage.create({ name, email, message });
  } catch (error) {
    console.error("sendMessageAction", error);
    return { error: "Could not send your message. Please try again." };
  }

  revalidatePath("/admin");
  return { ok: true };
}
