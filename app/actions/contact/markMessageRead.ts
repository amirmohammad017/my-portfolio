"use server";

import { revalidatePath } from "next/cache";
import connectDb from "@/config/database";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import Message from "@/models/contact/Message";

export async function markMessageReadAction(id: string, _formData: FormData) {
  await requireAdmin();
  await connectDb();
  await Message.findByIdAndUpdate(id, { read: true });
  revalidatePath("/admin");
}
