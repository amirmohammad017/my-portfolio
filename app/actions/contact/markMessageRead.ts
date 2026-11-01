"use server";

import { revalidatePath } from "next/cache";
import connectDb from "@/config/database";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import ContactMessage from "@/models/contact/ContactMessage";

export async function markMessageReadAction(id: string, _formData: FormData) {
  await requireAdmin();
  await connectDb();
  await ContactMessage.findByIdAndUpdate(id, { read: true });
  revalidatePath("/admin");
}
