import mongoose, { Schema, models, model } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 2000 },
    read: { type: Boolean, default: false, index: true },
  },
  // Separate collection so it never mixes with Property Pulse "messages"
  { timestamps: true, collection: "contact_messages" },
);

const ContactMessage =
  models.ContactMessage || model("ContactMessage", ContactMessageSchema);

export default ContactMessage as mongoose.Model<unknown>;
