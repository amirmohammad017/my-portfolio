import connectDb from "@/config/database";
import Message from "@/models/contact/Message";

type MessageDoc = {
  _id: unknown;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date | string;
};

export type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export async function getMessages(limit = 50): Promise<ContactMessage[]> {
  await connectDb();

  const docs = await Message.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean<MessageDoc[]>();

  return docs.map((d) => ({
    _id: String(d._id),
    name: d.name,
    email: d.email,
    message: d.message,
    read: Boolean(d.read),
    createdAt: new Date(d.createdAt).toISOString(),
  }));
}
