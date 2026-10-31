import mongoose, { Schema, models, model } from "mongoose";

const MessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, maxlength: 2000 },
    read: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

const Message = models.Message || model("Message", MessageSchema);
export default Message as mongoose.Model<unknown>;
