import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
  content: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;