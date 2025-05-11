import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  booking: { type: Schema.Types.ObjectId, ref: 'booking' },
  content: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

const MessageModel = mongoose.model("message", messageSchema);
export default MessageModel;